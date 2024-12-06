const OpenAI = require("openai");
const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const openai = new OpenAI();

const PORT = 10002;

app.post("/list-reminders", async (req, res) => {
  console.log({ req });
  console.log({ result });
  res.send("result");
});

app.post("/get-ai-comment", async (req, res) => {
  if (req.body.reminders.length <= 0) {
    res.json({
      comment: {
        role: "assistant",
        refusal: null,
        content:
          "Parece que não há nada aqui, tente popular a agenda para que nossa Ia faça os devidos comentários",
      },
    });
    return;
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `sua unica funcao é fazer comentarios sobre o dia, nao devem ser feitas inferencias, listagem ou marcacoes para a agenda. não deve ser comentado sobre reunioes de trabalho. você apenas comenta sobre o dia com expressoes como: "dia corrido, considere separar a roupa antecipadamente" ou "dia tranquilo, aproveita para tirar um lazer" ou "dia com muitas tarefas em casa, não precisara sair"`,
      },
      {
        role: "user",
        content: `considere os eventos a seguir em uma agenda, e faca uma observação de 5 a 10 palavras sobre o dia e preparo para ele: ${req.body.reminders
          .map((r) => r.value)
          .join(", ")}`,
      },
    ],
  });

  console.log({ req: req.body });
  console.log({ completion: JSON.stringify(completion.choices) });
  res.json({ comment: completion.choices[0].message });
});

app.listen(PORT, () => console.log(`Barramento de eventos. Porta ${PORT}.`));
