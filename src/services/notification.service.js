const { sendToQueue, connectMQ, consumeQueue } = require("../config/rabbitmq");

const QUEUE_NAME = process.env.QUEUE_NAME;

const initNotificationConsumer = async () => {
    await connectMQ(process.env.RABBITMQ_URI, QUEUE_NAME);

    consumeQueue(QUEUE_NAME, async (data) => {
        console.log(`Sending notification to ${data.email}: ${data.message}`);
    });
};

const sendNotification = async (payload) => {
    await sendToQueue(QUEUE_NAME, payload);
};

module.exports = {
    initNotificationConsumer,
    sendNotification
};