require("dotenv").config();
const express = require("express");
const initDatabase = require("./src/config/db");
const userRoutes = require("./src/routes/user.route");
const { initNotificationConsumer } = require("./src/services/notification.service");

const app = express();
app.use(express.json());

initDatabase(); //DB 
initNotificationConsumer(); //rabbitMQ

app.use('/user', userRoutes)

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);