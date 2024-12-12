const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");

app.use(cors());

const saveReminder = async (event) => {
  const response = await axios.post(
    "http://localhost:10001/list-reminders",
    event
  );

  return response.data;
};
const deleteReminder = async (id, index) => {
  const response = await axios.delete(
    `http://localhost:10001/list-reminders/${id}/${index}`
  );

  return response.data;
};

app.post("/eventos", async (req, res) => {
  const evento = req.body;
  const result = await saveReminder(evento);
  res.json(result);
});

app.delete("/eventos/:id/:index", async (req, res) => {
  const { id, index } = req.params;

  const result = await deleteReminder(id, index);
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
    const resp = await axios.post(
      "http://localhost:10002/get-ai-comment",
      req?.body
    );
    console.log({ resp: resp.data.comment });
    res.json(resp.data.comment);
  } catch (error) {}
});

app.listen(10000, () => console.log("Barramento de eventos. Porta 10000."));
