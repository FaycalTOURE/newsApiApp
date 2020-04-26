const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Mandatories = require('../../services/mandatory.service');
const { checkFields } = require('../../services/request.service');
const Models = require('../../models/index');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');

router.post('/', ( req, res, next ) => {
    console.log('=> Requête', req, '\n', '=> Response',res);
    console.log('register', req.body);

    if (typeof req.body === 'undefined' || req.body === null) {
        sendBodyError(res, 'No body data provided')
    }

    const { miss, extra, ok } = checkFields( Mandatories.register , req.body);
    if (!ok) { sendFieldsError(res, 'Bad fields provided', miss, extra) }
    else{
        // Generate password hash
        bcrypt.hash(req.body.password, 10)
            .then( hashedPassword => {
                req.body.password = hashedPassword;

                Models.identity.create( req.body )
                    .then( identity => sendApiSuccessResponse(res, 'Identity created', { identity, identity }))
                    .catch( err => sendApiErrorResponse(res, 'Identity not created', err))
            })
            .catch( bcryptError => sendApiErrorResponse(res, 'Bcrypt error', req.body))
    }
});

module.exports = router;
