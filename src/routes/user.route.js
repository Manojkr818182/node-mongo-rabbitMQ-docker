const express = require("express");
const router = express.Router();
const {
    createUser,
    getUsers
} = require("../controllers/user.controller");

router.post('/create', createUser);
router.get('/users', getUsers);

module.exports = router;