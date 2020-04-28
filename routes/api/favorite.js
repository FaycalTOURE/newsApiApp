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

router.delete('/:id', (req, res, next) => {
    // Delete  object
    Models.favorite.deleteOne( { _id: req.params['id'] } )
        .then( data => sendApiSuccessResponse(res, `Favorite deleted!`, { data }))
        .catch( err => sendApiErrorResponse(res, `Favorite not deleted...`, err))
});

module.exports = router;
