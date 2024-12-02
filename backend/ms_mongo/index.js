const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()

app.use(cors());

// const uri =
//   "mongodb+srv://willrmtech:PLrGm1BMmvLJ5MIU@cluster0.7fiok.mongodb.net/unipcal?retryWrites=true&w=majority&appName=Cluster0";


const { DB_USER, DB_PASS} = process.env

const uri =
  `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.7fiok.mongodb.net/unipcal?retryWrites=true&w=majority&appName=Cluster0`;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    await mongoose.connect(uri);

    const Cat = mongoose.model("Cat2a", { name: String });

    const kitty = new Cat({ name: "Zildjian" });
    kitty.save().then(() => console.log("meow"));
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

// PLrGm1BMmvLJ5MIU

app.post("/eventos", async (req, res) => {
  console.log({ req });
});

app.get("/eventos", (req, res) => {
  // res.send(eventos);
  run();
});

app.listen(10001, () => console.log("Barramento de eventos. Porta 10000."));
