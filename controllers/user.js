const User = require('../models/user');
const {validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "Unable to Add User"
            });
        }

        return res.json({
            message: "Success",
            user
        })
    }); // to save the data
}

exports.signin = (req, res) => {
    const {email, password} = req.body;

    // check if email exist in db
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Email is not found"
            })
        }

        // Authenticated
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Email and Password doesn't Match"
            })
        }

        // valid User - create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        // put token in cookies for 1 day
        res.cookie('token', token, {expire: new Date() + 1});
        // send res to frontend
        const { _id, name, email } = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                email
            }
        });
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.json({
        message: "User signed out successfully"
    })
}