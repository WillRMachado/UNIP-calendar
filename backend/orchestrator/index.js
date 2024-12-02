const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");

const eventos = [{ number: 28 }];

app.use(cors());

const saveReminder = async (event) => {
  const response = await axios.post("http://localhost:10001/list-reminders", event);


  return response.data
};

// PLrGm1BMmvLJ5MIU

app.post("/eventos", async (req, res) => {
  const evento = req.body;
  const result = await saveReminder(evento);
  res.json(result);
  //envia o evento para o microsserviço de lembretes
  //   try {
  //     await axios.post("http://localhost:4000/eventos", evento);
  //   } catch (e) {}
  //   //envia o evento para o microsserviço de observações
  //   try {
  //     await axios.post("http://localhost:5000/eventos", evento);
  //   } catch (e) {}
  //   //envia o evento para o microsserviço de consulta
  //   try {
  //     await axios.post("http://localhost:6001/eventos", evento);
  //   } catch (e) {}
  //   //envia o evento para o microsserviço de classificação
  //   try {
  //     await axios.post("http://localhost:7000/eventos", evento);
  //   } catch (e) {}
  //   res.send({ msg: "ok" });
});

app.get("/list-reminders", async (req, res) => {
  try {
    const resp = await axios.get("http://localhost:10001/list-reminders");

    res.json(resp.data);
  } catch (error) {}
  //   res.send(eventos);
});

app.listen(10000, () => console.log("Barramento de eventos. Porta 10000."));
