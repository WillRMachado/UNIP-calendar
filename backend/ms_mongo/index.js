const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Reminder = require("./schemas/reminders.js");
app.use(cors());

const dbInitVal = [
  {
    dayName: "segunda",
    reminders: [],
  },
  {
    dayName: "terca",
    reminders: [],
  },
  {
    dayName: "quarta",
    reminders: [],
  },
  {
    dayName: "quinta",
    reminders: [],
  },
  {
    dayName: "sexta",
    reminders: [],
  },
];

const PORT = 10001;

const { DB_USER, DB_PASS } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.7fiok.mongodb.net/unipcal?retryWrites=true&w=majority&appName=Cluster0`;

async function saveEvent(event) {
  try {
    console.log({ event, b: event.day.reminders });
    await mongoose.connect(uri);
    const reminder = Reminder;

    const a = await reminder.findOneAndUpdate(
      { dayName: event.day.dayName },
      { reminders: [...event.day.reminders, event.value] },
      { returnOriginal: false }
    );

    const resultFinal = await listReminders();
    console.log({ a });
    return resultFinal;
  } finally {
    mongoose.connection.close();
  }
}

const initialiseDb = async () => {
  try {
    await mongoose.connect(uri);

    const reminder = Reminder;
    const a = await reminder.insertMany(dbInitVal); //.create();
    console.log({ a });
  } catch (error) {
  } finally {
    mongoose.connection.close();
  }
};
const listReminders = async () => {
  try {
    await mongoose.connect(uri);
    const reminders = await Reminder.find();
    console.log({ reminders });
    if (reminders.length === 0) {
      mongoose.connection.close();
      await initialiseDb();
      return await listReminders();
    }
    return reminders;
  } catch (error) {
  } finally {
    console.log("call");
    mongoose.connection.close();
  }
};

app.post("/list-reminders", async (req, res) => {
  console.log({ req });
  const result = await saveEvent(req.body);
  console.log({ result });
  res.send(result);
});

app.get("/list-reminders", async (req, res) => {
  const reminders = await listReminders();
  console.log({ reminders });
  res.json(reminders);
});

app.listen(PORT, () => console.log(`Barramento de eventos. Porta ${PORT}.`));
