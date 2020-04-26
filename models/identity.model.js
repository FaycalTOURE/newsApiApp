const mongoose = require('mongoose');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');

const identitySchema = new Schema({
    email: {unique: true, type: String},
    password: String,
    pseudo: String,
});

identitySchema.methods.generateJwt = (user) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 59);

    const jwtObj = {
        _id: user._id,
        expireIn: '10s',
        exp: parseInt(expiry.getTime() / 100, 10)
    };
    // JWT creation
    return jwt.sign(jwtObj, process.env.JWT_SECRET)
};

const IdentityModel = mongoose.model('identity', identitySchema);
module.exports = IdentityModel;
//
