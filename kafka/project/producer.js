const { Kafka } = require('kafkajs');
const msg = process.argv[2];

run();
async function run () {
    try {

        // TCP connection
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        })

        // create producer interface
        const producer = kafka.producer();

        // connect
        console.log("Conenecting ........");
        await producer.connect();
        console.log("Connected!");

        // A-M 0, N-Z 1
        const partition = msg[0].toUpperCase() < "N" ? 0 : 1;
        
        //  publish
        const result = await producer.send({
            "topic": "Users",
            "messages": [{
                "value": msg,
                "partition": partition
            }]
        })

        console.log('Published Succesfully!');
        console.log(result);

        await producer.disconnect()
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        process.exit();
    }
}