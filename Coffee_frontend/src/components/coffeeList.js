import React from "react";
import DeleteCoffee from "./deleteCoffee";
import "../styling/coffeeList.css";

const CoffeeList = ({
  coffees,
  searchName,
  selectedOption,
  onDeleteCoffee,
}) => {
  const filteredCoffees = coffees.filter((coffee) => {
    const searchTerm = searchName.toLowerCase();

    switch (selectedOption) {
      case "Name":
        return coffee.name.toLowerCase().includes(searchTerm);
      case "Weight":
        return coffee.weight.toString().includes(searchTerm);
      case "Price":
        return coffee.price.toString().includes(searchTerm);
      case "Roast level":
        return coffee.strength.toString().includes(searchTerm);
      default:
        return false;
    }
  });

  return (
    <div className="container">
      {filteredCoffees.map((coffee, index) => (
        <div className="card" key={index}>
          <div className="card-content">
            <strong>Name:</strong> {coffee.name}
            <br />
            <strong>Weight:</strong> {coffee.weight}
            <br />
            <strong>Price:</strong> {coffee.price}
            <br />
            <strong>Roast level:</strong> {coffee.strength}
            <DeleteCoffee coffee={coffee} onDeleteCoffee={onDeleteCoffee} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoffeeList;
