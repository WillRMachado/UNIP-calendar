
const express = require("express");
const OpenAI = require("openai");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
validarCredenciaisAPI();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const { Kafka } = require('kafkajs');


const kafka = new Kafka({
  clientId: 'gpt',
  brokers: ['kafka:9092'],
});
const consumer = kafka.consumer({ groupId: 'grupo-consumo-gpt' });

const consumeMensagensKafka = async () => {
  let consumedMessage = null; 
  await consumer.connect();
  await consumer.subscribe({ topic: 'unip-prova'});
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Mensagem recebida: ${message}`);
      await consumer.disconnect();
      //Requisicao
      const resp = await axios.post(
        `http://${HOST}:10002/get-ai-comment`,
        message
      );
      res.json(resp.data.comment);     
    },
  });
  return consumedMessage;
};



const PORT = 10002;


const validateReminders = (reminders) => {
  if (!Array.isArray(reminders)) {
    return "Opa! A estutura da mensagem não está adequada!";
  }

  if (reminders.length === 0) {
    return "Parece que não há nada aqui. Tente popular a agenda para que nossa IA faça os devidos comentários.";
  }

  for (let i = 0; i < reminders.length; i++) {
    if (!reminders[i] || typeof reminders[i] !== 'string') {
      return `Evento inválido '${reminders[i]}': O campo deve ser um texto.${typeof reminders[i] }`;
    }
  }
  return null;  
};

const getAiCommentFromOpenAI = async (reminders) => {
  try {   
    const prompt = `Considere os eventos a seguir em uma agenda, e faça uma observação de 5 a 10 palavras sobre o dia e preparo para ele: ${reminders.map((r) => r).join(", ")}`;
    console.log(prompt);

    // Chama o modelo GPT-4 com as instruções
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [
    //     {
    //       role: "system",
    //       content: `Sua única função é fazer comentários sobre o dia. Não devem ser feitas inferências ou listagens. Não comente sobre reuniões de trabalho, apenas sobre o dia com expressões como: "Dia corrido, considere separar a roupa antecipadamente."`,
    //     },
    //     {
    //       role: "user",
    //       content: prompt,
    //     },
    //   ],
    // });
    return {
        role: "assistant",
        content: "OK, deu certo!",
        refusal: null
    }; //completion.choices[0].message;
  } catch (error) {
    console.error("Erro ao chamar o OpenAI:", error);
    throw new Error("Erro ao gerar o comentário.");
  }
};



app.post("/list-reminders", async (req, res) => {
  res.send("result");
});

app.post("/get-ai-comment", async (req, res) => {
  
 
  const { reminders } = req.body;

  

  // Valida os dados recebidos
  const validationError = validateReminders(reminders);
  if (validationError) {
    res.json({
      comment: {
        role: "assistant",
        content: validationError,
        refusal: null
      },
    });
    return;
  }

  try {
    // Chama a função que interage com o OpenAI para gerar o comentário
    const comment = await getAiCommentFromOpenAI(reminders);
    // Retorna o comentário gerado
    res.json({comment:  comment});
  } catch (error) {
    // Tratamento de erro caso a chamada ao OpenAI falhe
    res.status(500).json({
      error: "Erro interno ao gerar comentário. Tente novamente mais tarde.",
    });
  }
});

app.listen(PORT, () => console.log(`Barramento de eventos. Porta ${PORT}.`));


function validarCredenciaisAPI(){
  if (!process.env.OPENAI_API_KEY) {
    console.error("A chave da API da OpenAI não foi encontrada. Verifique o arquivo .env.");
    process.exit(1); // Interrompe a execução do código
  }
}