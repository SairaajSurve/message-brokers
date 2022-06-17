const { Kafka } = require('kafkajs');


run();
async function run () {
    try {

        // TCP connection
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        // create consumer interface
        const consumer = kafka.consumer({
            "groupId": "test"
        });

        // connect
        console.log("Conenecting ........");
        await consumer.connect();
        console.log("Connected!");

        // subscribe to a topic
        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        // start consuming i.e. poll the topic for message
        // the function eachMessage will run for each message received
        await consumer.run({
            "eachMessage": async (result) => {
                console.log(`Recieved msg: ${result.message.value} on partition ${result.partition}`);
            }
        })

    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}