const amqp = require('amqplib');

let channel = null;

async function connectMQ(uri, queueName) {
    try {
        const connection = await amqp.connect(uri);
        channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: true });
        console.log('RabbitMQ connected');
        return channel;
    } catch (err) {
        console.error('Failed to connect to RabbitMQ:', err);
        throw err;
    }
}

function getChannel() {
    if (!channel) throw new Error('RabbitMQ channel is not initialized');
    return channel;
}

async function sendToQueue(queueName, message) {
    const ch = getChannel();
    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
}

async function consumeQueue(queueName, callback) {
    const ch = getChannel();
    ch.consume(queueName, async (msg) => {
        if (msg !== null) {
            const data = JSON.parse(msg.content.toString());
            await callback(data);
            ch.ack(msg);
        }
    });
}

module.exports = { connectMQ, getChannel, sendToQueue, consumeQueue };