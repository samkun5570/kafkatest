const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
    clientId:"test-kafka",
    brokers:['192.168.56.1:9092'],
})