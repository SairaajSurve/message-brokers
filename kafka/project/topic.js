const { Kafka } = require('kafkajs');

run();
async function run () {
    try {

        // TCP connection
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        // create admin interface
        const admin = kafka.admin();

        // connect
        console.log("Conenecting ........");
        await admin.connect();
        console.log("Connected!");

        // create a topic
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })
        console.log("Created Succesfully!");

        await admin.disconnect()
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        process.exit();
    }
}