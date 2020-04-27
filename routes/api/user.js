const express = require('express');
const router = express.Router();
const VerifyToken = require('../../services/VerifyToken');
const Models = require('../../models/index');

router.get('/', VerifyToken, async ( req, res, next ) => {
    console.log('=> Requête', req, '\n', '=> Response',res);

    Models.identity.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
});

module.exports = router;
