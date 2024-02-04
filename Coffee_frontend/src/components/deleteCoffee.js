import React from "react";

const DeleteCoffee = ({ coffee, onDeleteCoffee }) => {
  const handleDelete = () => {
    onDeleteCoffee(coffee);
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteCoffee;
