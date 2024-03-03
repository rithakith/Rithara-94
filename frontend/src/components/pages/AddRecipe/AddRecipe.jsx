import React, { useState } from "react";
import "./AddRecipe.css";
import uploadImage from "../../../assets/upload1.png";

const AddRecipe = () => {
  const [image, setImage] = useState(false);
  const [RecipeDetails, setRecipeDetails] = useState({
    title: "",
    image: "",
    ingredients: "",
    directions: "",
    cooktime: "",
    category: "Veg",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setRecipeDetails({ ...RecipeDetails, [e.target.name]: e.target.value });
  };

  const add_Product = async () => {
    
    console.log(RecipeDetails);
    let responseData;
    let recipe = RecipeDetails;

    let formData = new FormData();
    formData.append("recipe", image);
    await fetch(`http://localhost:4000/upload`, {
      method: 'POST',
      headers: {
        accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      recipe.image = responseData.image_url;
      await fetch("http://localhost:4000/addrecipe", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(recipe),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Recipe added") : alert("failed");
        });
    }
  };

  return (
    <div className="body">
      <h1>Add your Recipe</h1>
      <form>
        <label htmlFor="title">
          title:{" "}
          <input
            type="text"
            value={RecipeDetails.title}
            name="title"
            onChange={changeHandler}
            id=""
            placeholder="Enter the title"
          />
        </label>
        <br />
        <label htmlFor="ingredients">
          Ingredients: <br />
          <textarea
            onChange={changeHandler}
            name="ingredients"
            id=""
            value={RecipeDetails.ingredients}
            cols="30"
            rows="10"
          ></textarea>
        </label>
        <br />
        <label htmlFor="cookTime">
          CookTime:{" "}
          <input
            type="number"
            onChange={changeHandler}
            name="cooktime"
            id=""
            value={RecipeDetails.cooktime}
          />
        </label><br />
        <label htmlFor="category">
          Category: 
          <select
            name=""
            id="" 
            value={RecipeDetails.category}
            onChange={changeHandler}
          >
            <option value="Veg">Veg</option>
            <option value="Non Veg">Non Veg</option>
          </select>
        </label>
        <br />
        <br />
        <div>
          <label htmlFor="file-input">
            <img
              id="upload"
              src={image ? URL.createObjectURL(image) : uploadImage}
              alt=""
            />
            <br />
            <input type="file" onChange={imageHandler} name="image" />
          </label>
        </div>
        <button id="addproduct"
          onClick={() => {
            add_Product();
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};
export default AddRecipe;
