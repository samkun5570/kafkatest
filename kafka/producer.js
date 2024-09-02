const { kafka } = require('./kafka_client');
const readline = require('readline')

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

async function producerConnect(){
    const producer = kafka.producer();
    console.log("Connecting Producer")
    await producer.connect();
    console.log("producer connected");
    return producer
}

async function producerDisConnect(producer){
    console.log("DISConnecting Producer")
    await producer.disconnect()
    console.log("producer disconnected")
    process.exit(0); 
}
''
async function sendMessage(producer,message){
    console.log("message sending",message)
    const [name,data] = message.split(' ')
    await producer.send({
        topic:'test-topic',
        messages:[
            {
                partition:name.toLowerCase() === 'test'?0:1,
                key:'test-updates',
                value:JSON.stringify({
                    name:name,
                    data:data
                })
            }
        ]
    })
    console.log("message sent",message)
}

async function init(){
    producer = await producerConnect()
    rl.setPrompt('Enter your mesaage and name like "(name message)" and use "exit" to terminate')
    rl.setPrompt('> ')
    rl.prompt();
    rl.on('line',async function(line){
        if (line === 'exit') {
            rl.close();
        }
        else{
            await sendMessage(producer,line)
            rl.prompt('> ')
        }
    }).on('close',()=>{
        producerDisConnect(producer)
    })
}

init()