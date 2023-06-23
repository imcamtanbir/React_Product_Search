import React from "react";
import Image from "./HeroImage.jpeg";
import classes from "./HeroImage.module.css";

function HeroImage() {
  return (
    <div className={classes.container}>
      <img src={Image} alt="Hero" />
      <div className={classes.textblock}>
        <h2>Wall Paint & Primer</h2>
        <h1>38px rem</h1>
        <p>s simply dummy text of the printing and typesetting industry.</p>
      </div>
    </div>
  );
}

export default HeroImage;
