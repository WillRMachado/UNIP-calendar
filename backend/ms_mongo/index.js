const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Reminder = require("./schemas/reminders.js");
app.use(cors());

const PORT = 10001;

const { DB_USER, DB_PASS } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.7fiok.mongodb.net/unipcal?retryWrites=true&w=majority&appName=Cluster0`;

async function saveEvent() {
  try {
    await mongoose.connect(uri);
    const newReminder = new Reminder({
      dayNumber: 28,
      monthNumber: 10,
      yearNumber: 2023,
      reminderText: "Teste",
    });
    await newReminder.save();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    mongoose.connection.close();
  }
}

const listReminders = async () => {
  try {
    await mongoose.connect(uri);
    const reminders = await Reminder.find();
    return reminders;
  } catch (error) {
  } finally {
    console.log("call");
    mongoose.connection.close();
  }
};

app.post("/list-reminders", async (req, res) => {
  console.log({ req });
  saveEvent();
});

app.get("/list-reminders", async (req, res) => {
  // res.send(eventos);
  const reminders = await listReminders();
  console.log({ reminders });
  res.json(reminders);
});

app.listen(PORT, () => console.log(`Barramento de eventos. Porta ${PORT}.`));
