const express = require('express');
const router = express.Router();

const Mandatories = require('../../services/mandatory.service');
const { checkFields } = require('../../services/request.service');
const Models = require('../../models/index');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');

router.post('/', (req, res, next) => {
    if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, 'No body data provided') };

    // Check fields in the body
    const { miss, extra, ok } = checkFields( Mandatories.favorite , req.body);
    //=> Error: bad fields provided
    console.log(ok, req.body);
    if (!ok) { sendFieldsError(res, 'Bad fields provided', miss, extra) }
    else{
        // Create new object
        Models.favorite.create( req.body )
            .then( data => sendApiSuccessResponse(res, `Favorite created!`, { data }))
            .catch( err => sendApiErrorResponse(res, `Favorite not created...`, err))
    }
});

router.delete('/:id', (req, res, next) => {
    // Delete  object
    Models.favorite.deleteOne( { _id: req.params['id'] } )
        .then( data => sendApiSuccessResponse(res, `Favorite deleted!`, { data }))
        .catch( err => sendApiErrorResponse(res, `Favorite not deleted...`, err))
});

module.exports = router;
