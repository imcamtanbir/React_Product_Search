import React from "react";
function Card({ img, title, color }) {
  return (
    <section className="card">
      <img src={img} alt={title} className="card-img" />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <h5 className="card-title">{color}</h5>
        <button className="card-btns">View Details</button>
      </div>
    </section>
  );
}

export default Card;
