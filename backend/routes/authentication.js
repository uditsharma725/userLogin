const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = "uditsharma";


// CREATING A USER:
router.post('/signup', [
    body('email').isEmail(),
    body('name').isLength({ min: 4 }),
    body('password').isLength({ min: 8 })
],
    async (req, res) => {

        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(400).json({ msg: "Error Creating User", success: false });


        try {

            let user = await User.findOne({ email: req.body.email });
            if (user) return res.status(400).json({ msg: "User already exists", success: false });

            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePass
            });

            const data = {
                user: {
                    id: user.id,
                    email: user.email
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            console.log(data);
            res.status(200).json({ token: authToken, email: user.email, success: true });

        } catch (error) { res.status(500).json({ msg: "Internal Server Error", success: false }) }

    });


//LOGGING IN A USER:
router.post('/login', [body('email').isEmail()], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ msg: "Enter A Valid Email", success: false });

    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ msg: "Please Enter Correct Credetials", success: false });

        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passCompare) return res.status(400).json({ msg: "Please Enter Correct Credetials", success: false });

        const data = {
            user: {
                id: user.id,
                email: user.email
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(data);
        res.status(200).json({ token: authToken, email: user.email, success: true });

    } catch (error) { res.status(500).json({ msg: "Internal Server Error", success: false }) }

});


router.get('/userInfo', fetchUser, async (req, res) => {

    try {

        const userId = req.user.id;
        const userInfo = await User.findById(userId).select("-password");
        res.status(200).json({ user: userInfo, success: true });

    } catch (error) { res.status(500).json({ msg: "Internal Sever Error", success: false }) }

});


module.exports = router;