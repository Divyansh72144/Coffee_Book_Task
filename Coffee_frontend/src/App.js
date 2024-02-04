import { useState, useEffect } from "react";
import CoffeeForm from "./components/addCoffee";
import CoffeeList from "./components/coffeeList";
import coffeeServices from "./services/coffeeServices";
import CoffeeSearch from "./components/coffeeSearch";
import "./App.css";

const App = () => {
  const [coffees, setCoffees] = useState([]);
  const [newName, setNewName] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [searchName, setSearchName] = useState("");
  const [newStrength, setNewStrength] = useState(5);
  const [searchOptions] = useState(["Name", "Weight", "Price", "Roast level"]);
  const [selectedOption, setSelectedOption] = useState("Name");

  const onDeleteCoffee = async (coffeeToDelete) => {
    try {
      await coffeeServices.remove(coffeeToDelete.id);
      const updatedCoffees = coffees.filter(
        (coffee) => coffee !== coffeeToDelete
      );
      setCoffees(updatedCoffees);
    } catch (error) {
      console.error("Error deleting coffee:", error);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleWeightChange = (event) => {
    setNewWeight(event.target.value);
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleStrengthChange = (event) => {
    setNewStrength(parseInt(event.target.value, 10));
  };

  const handleSearch = async (name) => {
    try {
      const response = await coffeeServices.searchByName(name);
      setCoffees(response.data);
    } catch (error) {
      console.error("Error searching coffees:", error);
    }
  };

  const addCoffee = async (event) => {
    event.preventDefault();

    if (!newName || !newWeight || !newPrice) {
      alert("Please enter both name and weight for the coffee");
      return;
    }

    const newCoffee = {
      name: newName,
      weight: newWeight,
      price: newPrice,
      strength: newStrength,
    };

    try {
      const response = await coffeeServices.create(newCoffee);
      setCoffees([...coffees, response.data]);
      setNewName("");
      setNewWeight("");
      setNewPrice("");
      setNewStrength(5);
    } catch (error) {
      console.error("Error adding coffee:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await coffeeServices.getAll();
        setCoffees(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Coffee/Tea Book</h2>
      <h2>Add a new coffee</h2>
      <CoffeeForm
        addCoffee={addCoffee}
        newName={newName}
        handleNameChange={handleNameChange}
        newWeight={newWeight}
        handleWeightChange={handleWeightChange}
        newPrice={newPrice}
        handlePriceChange={handlePriceChange}
        newStrength={newStrength}
        handleStrengthChange={handleStrengthChange}
      />
      <h2>Coffees</h2>
      <CoffeeSearch
        searchOptions={searchOptions}
        selectedOption={selectedOption}
        setSearchOption={setSelectedOption}
        searchName={searchName}
        setSearchName={setSearchName}
        onSearch={handleSearch}
      />{" "}
      <CoffeeList
        coffees={coffees}
        searchName={searchName}
        selectedOption={selectedOption}
        onDeleteCoffee={onDeleteCoffee}
      />
    </div>
  );
};

export default App;
