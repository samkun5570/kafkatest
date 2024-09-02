const { kafka } = require('./kafka_client');
const group = process.argv[2];

async function init(){
    const consumer = kafka.consumer({
        groupId:group
    });
    await consumer.connect();
    console.log("consumer connected")
    await consumer.subscribe({
        topics:["test-topic"],
        fromBeginning:true
    });
    console.log("consumer subscribed")

    await consumer.run({
        eachMessage:async({
            topic,partition,message,heartbeat,pause
        })=>{
            console.log(`Gropu : ${group} ,Topic : ${topic}, PART : ${partition},${message.toString()}`)
            console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers,
            })
        }   
    });
    
}
init()