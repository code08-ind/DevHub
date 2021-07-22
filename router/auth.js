const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");
const authenticate = require('../middleware/authenticate.js');
const router = express.Router();

router.use(cookieParser());

require('../db/conn.js');
const User = require('../model/userSchema.js');

//! async await
router.post('/register', async (req, res) => {
    const { name, email, phone, work, image, linkedin, github, portfolio, resume, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !image || !linkedin || !github || !portfolio || !resume || !password || !cpassword) {
        return res.status(422).json({ error: "Please Fill All The Details." });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email Already Exists." });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Passwords Are Not Matching." });
        } else {
            const user = new User({ name, email, phone, work, image, linkedin, github, portfolio, resume, password, cpassword });
            const userRegister = await user.save();
            if (userRegister) {
                res.status(201).json({ message: "User Created Successfully." });
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: '<email>',
                        pass: '<password>'
                    }
                });
                let mailOptions = {
                    from: '<email>',
                    to: email,
                    subject: 'Successfully Registered At DevHub!',
                    text: 'Thanks For Registering At DevHub. Find Like Minded Developers At DevHub'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error(error);
                    }
                    else {
                        console.log('Email Sent: ' + info.response);
                    }
                });
            } else {
                res.status(500).json({ error: "Failed To Register." });
            }
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Fill All The Details!" });
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const passwordMatch = await bcrypt.compare(password, userLogin.password);
            //? jwt token
            const token = await userLogin.generateAuthToken();
            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 299676),
                httpOnly: true
            });
            if (passwordMatch) {
                res.status(200).json({ message: "User Sign In Successfully!" });
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: '<email>',
                        pass: '<password>'
                    }
                });
                let mailOptions = {
                    from: '<email>',
                    to: email,
                    subject: 'Successfully Logined At DevHub!',
                    text: 'You Have Successfully Logined Through DevHub. Find Like Minded Developers At DevHub.'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error(error);
                    }
                    else {
                        console.log('Email Sent: ' + info.response);
                    }
                });
            }
            else {
                return res.status(400).json({ error: "Invalid Credentials!" });
            }
        } else {
            return res.status(400).json({ error: "Invalid Credentials!" });
        }
    } catch (error) {
        res.status(400).json({ error: "Failed To Sign In!" });
        console.log(error);
    }
});

router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/contact', authenticate, async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        return res.status(422).json({ error: "Please Fill All The Details." });
    }
    try {
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "Message Sent Successfully!" });
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '<email>',
                    pass: '<password>'
                }
            });
            let mailOptions = {
                from: '<email>',
                to: email,
                subject: 'Message Sent Successfully To DevHub',
                text: 'You Have Successfully Sent Message To DevHub. We Will Look Into Your Message And See Your Meesage And Try To Implement On It.'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error(error);
                }
                else {
                    console.log('Email Sent: ' + info.response);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("jwttoken", { path: "/" })
    res.status(200).send('User Logout');
});

module.exports = router;
