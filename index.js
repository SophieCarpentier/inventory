const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

// 1) Se connecter à la base de données
// A ne faire qu'une fois
mongoose.connect(
  "mongodb://localhost/inventory-app",
  { useNewUrlParser: true }
);

// 2) Définir les models/collections
// A ne faire qu'une fois
const Inventory = mongoose.model("Medic", {
  name: String,
  quantity: Number
});

//CREATE
app.post("/create", async (req, res) => {
  // Instanciation
  // Créer un objet `newStudent` qui n'est pas encore sauvegardé dans la base de données
  const newMedic = new Inventory({
    name: req.body.name,
    quantity: req.body.quantity
  });

  // Sauvegarder :
  await newMedic.save(); // Asynchrone

  // Suite qui se déclenchera apres la sauvegarde
  res.json({ message: "Medic added" });
});

// READ
// Service qui permet de consulter liste des medicaments
app.get("/", async (req, res) => {
  // Récupérer les données de la base de données
  const dataInventory = await Inventory.find(); // Asynchrone
  res.json(dataInventory);
});

app.listen(3000, () => {
  console.log("Server started");
});
