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
    await mongoose.connect(uri);
    const reminder = Reminder;

    const response = await reminder.findOneAndUpdate(
      { dayName: event.day.dayName },
      { reminders: [...event.day.reminders, event.value] },
      { returnOriginal: false }
    );

    const resultFinal = await listReminders();
    return resultFinal;
  } finally {
    mongoose.connection.close();
  }
}
async function deleteEvent(id, index) {
  try {
    await mongoose.connect(uri);
    const reminder = Reminder;

    const originalReminders = await reminder.findById(id);
    const remindersList = originalReminders.reminders;
    remindersList.splice(index, 1);
    const response = await reminder.findByIdAndUpdate(
      id,
      { reminders: remindersList },
      { returnOriginal: false }
    );

    const resultFinal = await listReminders();
    return resultFinal;
  } finally {
    mongoose.connection.close();
  }
}

const initialiseDb = async () => {
  try {
    // await mongoose.connect(uri);

    const reminder = Reminder;
    const a = await reminder.insertMany(dbInitVal); //.create();
  } catch (error) {
  } finally {
    // mongoose.connection.close();
  }
};
const listReminders = async () => {
  try {
    await mongoose.connect(uri);
    const reminders = await Reminder.find();
    if (reminders?.length === 0) {
      await initialiseDb();
      return await listReminders();
    }

    return reminders;
  } catch (error) {
    console.log({ error });
  } finally {
    // mongoose.connection.close();
  }
};

app.post("/list-reminders", async (req, res) => {
  const result = await saveEvent(req.body);
  res.send(result);
});
app.delete("/list-reminders/:id/:index", async (req, res) => {
  const { id, index } = req.params;

  const result = await deleteEvent(id, index);
  res.send(result);
});

app.get("/list-reminders", async (req, res) => {
  const reminders = await listReminders();
  console.log("result --->", { reminders });
  res.json(reminders);
});

app.listen(PORT, () => console.log(`Barramento de eventos. Porta ${PORT}.`));
