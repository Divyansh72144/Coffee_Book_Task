const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const Coffee = require("./models/coffee");

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/coffees/search", async (req, res) => {
  try {
    const searchTerm = req.query.name;

    if (!searchTerm) {
      return res.status(400).json({ error: "Invalid or missing search term" });
    }

    const value = searchTerm.substring(5);
    const result = await Coffee.find({
      name: { $regex: value, $options: "i" },
    });

    res.json(result);
  } catch (error) {
    console.error("Error searching coffees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//example url http://localhost:3000/api/coffees/search?term=name:sa

app.get("/api/coffees", (request, response) => {
  Coffee.find({}).then((coffee) => {
    response.json(coffee);
  });
});

app.get("/api/coffees/:id", (request, response) => {
  Coffee.findById(request.params.id)
    .then((coffee) => {
      if (coffee) {
        response.json(coffee);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/coffees", (request, response) => {
  const newCoffee = request.body;

  if (
    !newCoffee.name ||
    !newCoffee.weight ||
    !newCoffee.price ||
    !newCoffee.strength
  ) {
    console.log("Validation error:", newCoffee.name);
    return response.status(400).json({
      error: "Name, weight, price, and strength are required fields",
    });
  } else {
    const coffee = new Coffee({
      name: newCoffee.name,
      weight: newCoffee.weight,
      price: newCoffee.price,
      strength: newCoffee.strength,
    });

    coffee
      .save()
      .then((savedCoffee) => {
        response.json(savedCoffee);
      })
      .catch((error) => {
        console.error("Error saving coffee:", error);
        response.status(500).json({
          error: "Internal Server Error",
        });
      });
  }
});

app.delete("/api/coffees/:id", async (request, response) => {
  const coffeeId = request.params.id;

  const existingCoffee = await Coffee.findById(coffeeId);
  if (!existingCoffee) {
    return response.status(404).json({ error: "Coffee not found" });
  }

  Coffee.findByIdAndDelete(coffeeId)
    .then((result) => {
      console.log(result);
      response.status(204).end();
    })
    .catch((error) => error);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
