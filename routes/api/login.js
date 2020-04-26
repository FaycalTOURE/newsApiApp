const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Mandatories = require('../../services/mandatory.service');
const { checkFields } = require('../../services/request.service');
const Models = require('../../models/index');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');

router.post('/', ( req, res, next ) => {
    console.log('=> Requête', req, '\n', '=> Response',res);

    if (typeof req.body === 'undefined' || req.body === null) {
        sendBodyError(res, 'No body data provided')
    }

    const { miss, extra, ok } = checkFields( Mandatories.login , req.body);
    if (!ok) { sendFieldsError(res, 'Bad fields provided', miss, extra) }
    else{
        Models.identity.findOne( { email: req.body.email }, )
            .then( identity => {
                const validPassword = bcrypt.compareSync(req.body.password, identity.password);

                if(!validPassword){
                    sendApiErrorResponse(res, 'Bad password', null)
                }
                else{
                    res.cookie(process.env.COOKIE_NAME, identity.generateJwt(identity), { httpOnly: true });
                    sendApiSuccessResponse(res, 'User logged', { identity,  cookie: res.cookie })
                }
            })
            .catch( err => sendApiErrorResponse(res, 'Identity not created', err))
    }
});

module.exports = router;
