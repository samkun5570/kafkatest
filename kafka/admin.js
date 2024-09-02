const { kafka } = require('./kafka_client');

async function init(){
    const admin = kafka.admin()
    console.log("admin connecting...")
    admin.connect()
    console.log("connected")
    await admin.createTopics({
        topics:[
            {
                topic:'test-topic',
                numPartitions:2,
            },
        ],
    });
    console.log("topics created disconnecting admin")
    await admin.disconnect()
    console.log("admin disconnected")
}

init()