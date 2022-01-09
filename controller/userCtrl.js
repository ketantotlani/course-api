const User = require('../model/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

const userCtrl = {
    register: async (req,res) => {
        try {
            const { name,mobile,email,password } = req.body;

            let user = await User.findOne({ email });
                if(user)
                    return res.status(400).json({msg: "User account already exists."})

            if(password.length < 6)
                return res.status(400).json({msg: "Passsword length must be greater than 6 characters."});


            let passHash = await bcrypt.hash(password,10);

            let newUser = User({
                name,
                email,
                mobile,
                password: passHash
            });

            await newUser.save();
            // res.json({data: newUser});
            res.status(200).json({msg: "User registered successfully"});
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    login: async (req,res) => {
        try {
            
            const { email, password }= req.body;

            let user = await User.findOne({ email });
                if(!user)
                    return res.status(400).json({ msg: "User doesn't exists." });


            let isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch)
                    return res.status(400).json({ msg: "Password doesn't match" })

            let accessToken = createAccessToken({ id: user._id })
            let refreshToken = createRefreshToken({ id: user._id })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/reqToken',
                maxAge: 1 * 24 * 60 * 60 * 1000
            })

            res.json({ accessToken })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    logOut: async (req,res) => {
        try {
            res.clearCookie('refreshToken', { path: "/user/reqToken" });
            return res.status(200).json({ msg: "Logout Successfully" })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    reqToken: async (req,res) => {
        try {
            const reqToken = req.cookies.refreshToken;
            if(!reqToken)
                return res.status(400).json({ msg: "Session Expired, Login Again.." });

            jwt.verify(reqToken, config.refreshToken, (err,user) => {
                if(err)
                return res.status(400).json({ msg: "Session Expired, Login Again.." });

                const accessToken = createAccessToken({ id: user._id });
                    res.json({accessToken});
            })
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req,res) => {
        try {
            const user = await User.findById(req.user.id).select("-password")
                if(!user)
                    return res.status(400).json({ msg: "User doesn't Exists." })

                res.json(user)
        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
};


const createAccessToken = (user) => {
    return jwt.sign(user, config.accessToken, { expiresIn: '1d'});
};
const createRefreshToken = (user) => {
    return jwt.sign(user, config.refreshToken, { expiresIn: '1d'});
};

module.exports = userCtrl;