
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

const PORT = 10002;


const validateReminders = (reminders) => {
  if (!Array.isArray(reminders)) {
    return "O campo 'reminders' deve ser um array.";
  }

  if (reminders.length === 0) {
    return "O array 'reminders' não pode estar vazio.";
  }

  for (let i = 0; i < reminders.length; i++) {
    if (!reminders[i] || typeof reminders[i] !== 'string') {
      return `Evento inválido na posição ${reminders[i]}: O campo 'value' deve ser uma string.${typeof reminders[i] }`;
    }
  }
  return null;  
};

const getAiCommentFromOpenAI = async (reminders) => {
  try {   
    console.log(reminders);
    const prompt = `Considere os eventos a seguir em uma agenda, e faça uma observação de 5 a 10 palavras sobre o dia 
    e preparo para ele: ${reminders.map((r) => r.value).join(", ")}`;

    // Chama o modelo GPT-4 com as instruções
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Sua única função é fazer comentários sobre o dia. Não devem ser feitas inferências ou listagens. Não comente sobre reuniões de trabalho, apenas sobre o dia com expressões como: "Dia corrido, considere separar a roupa antecipadamente."`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao chamar o OpenAI:", error);
    throw new Error("Erro ao gerar o comentário.");
  }
};



app.post("/list-reminders", async (req, res) => {
  res.send("result");
});

app.post("/get-ai-comment", async (req, res) => {
  
  console.log(req);
  
  const { reminders } = req.body;

  

  // Valida os dados recebidos
  const validationError = validateReminders(reminders);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  // Se a agenda está vazia, retorna um comentário padrão
  if (reminders.length === 0) {
    return res.json({
      comment: {
        role: "assistant",
        content: "Parece que não há nada aqui. Tente popular a agenda para que nossa IA faça os devidos comentários.",
      },
    });
  }

  try {
    // Chama a função que interage com o OpenAI para gerar o comentário
    const comment = await getAiCommentFromOpenAI(reminders);

    // Retorna o comentário gerado
    return res.json({
      comment: {
        role: "assistant",
        content: comment,
      },
    });
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
