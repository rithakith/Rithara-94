import React from "react";
import Heroimg from '../../assets/Hero.jpg'
import './Hero.css'
const Hero = () => {
  return (
    <div className="hero-right">
        <img src={Heroimg} alt="" style={{"height":"100vh","width":"100%"}} />
    </div>

)};

export default Hero;
