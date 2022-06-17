const amqp = require('amqplib')

const msg = { number: parseInt(process.argv[2]) };
connect();
async function connect () {

    try {

        // TCP connection
        const connection = await amqp.connect("amqp://localhost:5672");

        // Create a logical channel
        const channel = await connection.createChannel();

        // Checks if a queue exists and creates if doesn't
        // argument is the name of the queue
        const result = await channel.assertQueue("jobs");

        console.log("Result: ");
        console.log(result);
        // send to queue
        channel.sendToQueue("jobs", Buffer.from("hi"), { persistent: true, mandatory: true });

        console.log(`Job sent succesfully: ${msg.number}`);

        // close connection
        await connection.close();
    } catch (error) {
        console.log(error);
    }
}