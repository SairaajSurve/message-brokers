const amqp = require('amqplib')

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
        
        // consume messages
        channel.consume("jobs", (message) => {

            const input = JSON.parse(message.content.toString());
            console.log(`Received job with input ${input.number}`);
            console.log(input);

            // It is the job of the consumer to dequeue a job
            // Guarantees 'at least once' delivery
            // channel.ack(message);
        })

    } catch (error) {
        console.log(error);
    }
}