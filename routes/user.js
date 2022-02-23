const express = require('express');
const { signup, signin, signout } = require('../controllers/user');
// middleware -> validation using express
const {check} = require('express-validator');
const router = express.Router();

router.post('/signup', [
    check("email", "Email should be Valid").isEmail(),
    check("password", "Password should be Atleast 8 Characters").isLength({min: 8}),
    check("password", "Password should contain Atleast One Number").isAlphanumeric()
],signup); 

router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;