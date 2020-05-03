const express = require('express');
const router = express.Router();

const Mandatories = require('../../services/mandatory.service');
const { checkFields } = require('../../services/request.service');
const Models = require('../../models/index');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');

const VerifyToken = require('../../services/VerifyToken');

router.post('/', VerifyToken, (req, res, next) => {
    Models.favorite.create( req.body )
        .then( data => sendApiSuccessResponse(res, `Favorite created!`, { data }))
        .catch( err => sendApiErrorResponse(res, `Favorite not created...`, err))
});

router.get('/:id', VerifyToken, (req, res, next) => {
    Models.favorite.find({id : req.userId}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user favorite.");
        if (!user) return res.status(404).send("No user favorite found.");
        res.status(200).send(user);
    });
});

router.delete('/:id', VerifyToken, (req, res, next) => {
    Models.favorite.deleteOne( { _id: req.params['id'] } )
        .then( data => sendApiSuccessResponse(res, `Favorite deleted!`, { data }))
        .catch( err => sendApiErrorResponse(res, `Favorite not deleted...`, err))
});

module.exports = router;
