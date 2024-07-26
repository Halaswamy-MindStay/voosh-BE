const generateToken = require('../config/jwttoken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const admin = require('../config/firebaseAdmin');

// SignUp new user
const userSignUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
        return res.status(400).json({ error: 'Please enter all required fields' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(201).json({ message: 'User already exists' });
        }
        user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).json({ success: true, message: 'User Created', user });
    } catch (err) {
        console.error('Error in userSignUp:', err);  // Log the error
        res.status(500).json({ error: 'Error saving user' });
    }
}


// Login existing user
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }
        else if (!bcrypt.compareSync(password, user.password)) {
            return res.status(200).json({ message: 'Wrong password' });
        }
        const token = generateToken(user._id);
        res.status(201).json({ success: true, token, message: 'User Found', user });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

// Login existing users
const usersData = async (req, res) => {

    try {
        const user = await User.findOne();
        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        res.status(201).json({ success: true, token, message: 'User Found', user });

    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

const googleLogin = async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name } = decodedToken;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                firstname: name.split(' ')[0],
                lastname: name.split(' ')[1],
                email,
                password: email + process.env.JWT_SECRET,
                googleId: decodedToken.user_id,
            });

            await user.save();
        }
        const token = generateToken(user._id);
        res.status(200).json({ success: true, token, user });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = { userLogin, userSignUp, googleLogin,usersData }
