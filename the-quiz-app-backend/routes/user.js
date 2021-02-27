const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs')
const path = require('path')

const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
    .exec()
    .then( userList => {
        return res.status(200).json({
            userlist: userList
        })
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.post('/login', (req, res, next) => {
    const mobile = req.body.mobile
    const password = req.body.password
    User.find( { mobile })
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "Auth failed!" // User not found!
            }) 
        }
        bcrypt.compare(password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Auth failed!"
                });
            }
            if(result) {
                console.log(result)
                return res.status(200).json({
                    message: 'Auth successful!', // Password Match - Login Successful!
                    user_data: user[0],
                    auth: true
                });
            } else {
                return res.status(401).json({
                    message: 'Auth failed'  // Password Incorrect
                });
            }
        })
    })
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
 
var upload = multer({ storage: storage });

router.post('/register', upload.single('photo'), (req, res, next) => {
    const mobile = req.body.mobile
    User.find({ mobile })
    .exec()
    .then( user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: 'User exists!'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
                if(err) {
                    return res.status(500).json({
                        error: err,
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        mobile: mobile,
                        email: req.body.email,
                        password: hashPassword,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        gender: req.body.gender,
                        dob: req.body.dob,
                        country: req.body.country,
                        state: req.body.state,
                        city: req.body.city,
                        hobbies: req.body.hobbies,
                        photo: {
                            data: fs.readFileSync(path.join(__dirname + '/../' + '/uploads/' + req.file.filename)),
                            contentType: 'image/png'
                        }
                    })   
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: 'User created!',
                            user_data: result,
                            auth: true
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            });
        }
    })
})

module.exports = router;