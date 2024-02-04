import React from "react";
import "../styling/addCoffee.css";

const CoffeeForm = ({
  addCoffee,
  newName,
  handleNameChange,
  newWeight,
  handleWeightChange,
  newPrice,
  handlePriceChange,
  newStrength,
  handleStrengthChange,
}) => {
  return (
    <form onSubmit={addCoffee}>
      <div>
        <label>Name:</label>
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <label>Weight (in grams):</label>
        <input value={newWeight} onChange={handleWeightChange} />
      </div>
      <div>
        <label>Price:</label>
        <input value={newPrice} onChange={handlePriceChange} />
      </div>
      <div>
        <label>Roast Level:</label>
        <select value={newStrength} onChange={handleStrengthChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <button type="submit">Add Coffee</button>
      </div>
    </form>
  );
};

export default CoffeeForm;
