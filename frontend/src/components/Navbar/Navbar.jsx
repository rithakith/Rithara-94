import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
            <div className="logo">Rkrecipes</div>
            <div className="middle">
            <li><Link to='/recipes' style={{textDecoration:"none",color:"white"}}>Recipes</Link></li>
            <li><Link to ='/addrecipe' style={{textDecoration:"none",color:"white"}}>Add Recipe</Link></li>
            <li><Link to='/myprofile' style={{textDecoration:"none",color:"white"}}>My Profile</Link></li>
            </div>
            
            <div id="login"><Link to='/login' style={{textDecoration:"none",color:"white"}}>Login</Link></div>
          
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
