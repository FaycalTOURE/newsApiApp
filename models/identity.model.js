const mongoose = require('mongoose');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');


const identitySchema = new Schema({
    email: {unique: true, type: String},
    password: String,
    pseudo: String,
});

identitySchema.methods.generateJwt = (user) => {
    const jwtObj = {
        id: user._id,
    };
    // JWT creation
    return jwt.sign(jwtObj, process.env.JWT_SECRET, {
        expiresIn: 86400
    })
};

const IdentityModel = mongoose.model('identity', identitySchema);
module.exports = IdentityModel;
//
