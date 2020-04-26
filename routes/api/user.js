const express = require('express');
const router = express.Router();

const Models = require('../../models/index');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');

router.get('/:id', async ( req, res, next ) => {
    console.log(req.params.id);
    console.log('=> Requête', req, '\n', '=> Response',res);
    // Get user infos from user token
    Models.favorite.find( {author: req.params['id']}, (err, favorite) => {
        if( err ){ sendApiErrorResponse(res, 'Unknow user', err) }
        else{
            Models.identity.findById( req.params['id'], (err, user) => {
                if( err ){ sendApiErrorResponse(res, 'Unknow user', err) }
                else{ sendApiSuccessResponse(res, 'User logged', { user, favorite }) }
            });
        }
    });
});

module.exports = router;
