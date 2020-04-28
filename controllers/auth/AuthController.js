const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const VerifyToken = require('../../services/VerifyToken');

const Mandatories = require('../../services/mandatory.service');
const { checkFields } = require('../../services/request.service');
const Models = require('../../models/index');
const { sendBodyError, sendFieldsError, sendApiErrorResponse } = require('../../services/response.service');

router.post('/register', ( req, res, next ) => {
    if (typeof req.body === 'undefined' || req.body === null) {
        sendBodyError(res, 'No body data provided')
    }

    const { miss, extra, ok } = checkFields( Mandatories.register , req.body);
    if (!ok) { sendFieldsError(res, 'Bad fields provided', miss, extra) }
    else{
        bcrypt.hash(req.body.password, 10)
            .then( hashedPassword => {
                req.body.password = hashedPassword;

                Models.identity.create( req.body )
                    .then( identity => res.status(200).send({ auth: true, token: identity.generateJwt(identity), identity }))
                    .catch( err => sendApiErrorResponse(res, 'Identity not created', err))
            })
            .catch( bcryptError => sendApiErrorResponse(res, 'Bcrypt error', req.body))
    }
});

router.post('/login', ( req, res, next ) => {
    Models.identity.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        let cookie = req.cookies[process.env.COOKIE_NAME];
        if (cookie === undefined)
        {
            res.cookie(process.env.COOKIE_NAME, token, { maxAge: 900000, httpOnly: false });
            console.log('cookie created successfully');
        }else{
            console.log('cookie exist');
        }

        res.status(200).send({ auth: true, token: token });
    });
});

// cote client detruire cookie
// router.get('/logout', function(req, res) {
//     res.status(200).send({ auth: false, token: null });
// });


router.get('/user', VerifyToken, async ( req, res, next ) => {
    Models.identity.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
});

module.exports = router;
