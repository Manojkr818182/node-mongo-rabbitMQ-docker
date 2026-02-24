const User = require("../models/user.model");
const { sendNotification } = require("../services/notification.service");

exports.createUser = async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email
        });
        await sendNotification({
            email: user.email,
            message: `Welcome ${user.name}! Thanks for registering.`
        });
        res.json({
            status: true,
            data: user,
            message: "User created!"
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const userList = await User.find({});
        res.json({
            status: true,
            data: userList,
            message: "User list fetched!"
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
};
