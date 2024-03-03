const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ritharaedirisinghe:XWwvmI4Xm4i6bu86@cluster0.rvvv1za.mongodb.net/"
);

// API Creation

app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Schema for recipe
const Recipe = mongoose.model("Recipe", {
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
  cooktime: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// image upload
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("recipe"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

app.post("/addrecipe", async (req, res) => {
  let recipes = await Recipe.find({});
  let id;
  if (recipes.length > 0) {
    var last_id = recipes[recipes.length - 1].id;
    id = last_id + 1;
  } else {
    id = 1;
  }
  const recipe = new Recipe({
    id: id,
    title: req.body.title,
    image: req.body.image,
    category: req.body.category,
    cooktime: req.body.cooktime,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
  });

  console.log(recipe);
  await recipe.save();
  console.log("SAve");
  res.json({ success: true, title: req.body.title });
});

// Deleting Products
app.post("/removerecipe", async (req, res) => {
  await Recipe.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({ success: true, title: req.body.title });
});

// Get all products
app.get("/allrecipes", async (req, res) => {
  let recipes = await Recipe.find({});
  console.log("All Recipes Fetched");
  res.send(recipes);
});

// update recipes
app.put("/updaterecipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, ingredients, cooktime, category } = req.body;
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { id: id },
      { $set: { title, image, ingredients, cooktime, category } },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        error: "profile not found",
      });
    }
    console.log("Profile Update");
    res.json({
      success: true,
      recipe: updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating profile: ", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// User Schema
const Users = mongoose.model("Users", {
  firstname: {
    type: String,
  },
  secondname: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  recipesMade: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// creating endpoint for registering

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({
    email: req.body.email,
  });

  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "existing user found with same email" });
  }
  let recipes = {};
  for (let i = 0; i < 300; i++) {
    recipes[i] = 0;
  }
  const user = new Users({
    firstname: req.body.firstname,
    secondname: req.body.secondname,
    email: req.body.email,
    password: req.body.password,
    recipesMade: recipes,
  });

  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secretkey");
  res.json({ success: true, token });
});

// Login endpoint
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: { id: user.id },
      };
      const token = jwt.sign(data, "secretkey");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "wrong password" });
    }
  } else {
    res.json({ success: false, errors: "wrong email" });
  }
});
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error :" + error);
  }
});
