import React, { useEffect, useState } from 'react'

const RecipeContext = () => {
    const [all_recipes,setAll_recipes]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/allrecipes').then((response)=>response.json().then((data)=>setAll_recipes(data)))
    },[])
  return (
    <div>RecipeContext</div>
  )
}

export default RecipeContext