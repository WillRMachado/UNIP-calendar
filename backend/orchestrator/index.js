const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");

const eventos = [{ number: 28 }];

app.use(cors());

const saveReminder = async (event) => {
  const response = await axios.post(
    "http://localhost:10001/list-reminders",
    event
  );

  return response.data;
};

app.post("/eventos", async (req, res) => {
  const evento = req.body;
  const result = await saveReminder(evento);
  res.json(result);
});

app.get("/list-reminders", async (req, res) => {
  try {
    const resp = await axios.get("http://localhost:10001/list-reminders");

    res.json(resp.data);
  } catch (error) {}
});

app.post("/get-ai-comment", async (req, res) => {
  try {
    console.log({ req: req.body });
    const resp = await axios.post(
      "http://localhost:10002/get-ai-comment",
      req?.body
    );
    console.log({ resp:resp.data.comment });
    res.json(resp.data.comment);
  } catch (error) {}
});

app.listen(10000, () => console.log("Barramento de eventos. Porta 10000."));
