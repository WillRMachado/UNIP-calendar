const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'orchestrator',
    brokers: ['kafka:9092'],
  });
  const producer = kafka.producer();
  
  
  //Cria um tópico no Kafka caso não exista
  const createTopicIfNotExists = async () => {
    const admin = kafka.admin();
    await admin.connect();
    try {
      const topics = await admin.listTopics();
      if (!topics.includes('unip-prova')) {
        await admin.createTopics({
          topics: [{ topic: 'unip-prova', numPartitions: 1,replicationFactor: 1, }],
        });
        console.log('Tópico "unip-prova" criado!');
      }
    } catch (error) {
      console.error('Erro ao criar o tópico:', error);
    } finally {
      await admin.disconnect();
    }
  };
  
  //Envia mensagem para o tópico do Kafka
  const sendMessageKafka = async (message) => {
    try {
      await producer.connect();
      await createTopicIfNotExists();
  
      const result = await producer.send({
        topic: 'unip-prova',
        messages: [
          {
            value: JSON.stringify(message), // Convertendo para string
          },
        ],
      });
      console.log('Mensagem enviada:', result);  
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      await producer.disconnect();
    }
  };

  module.exports = {
    sendMessageKafka,
  };
  
