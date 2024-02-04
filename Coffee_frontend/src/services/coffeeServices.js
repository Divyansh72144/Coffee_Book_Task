import axios from "axios";

const BASE_URL = "/api/coffees";

const getAll = () => {
  return axios.get(BASE_URL);
};

const create = (newObject) => {
  return axios.post(BASE_URL, newObject);
};

const remove = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

const update = (id, newObject) => {
  return axios.put(`${BASE_URL}/${id}`, newObject);
};

const searchByName = (name) => {
  const params = { term: `name:${name}` };
  return getAll(params);
};

const coffeeServices = {
  getAll,
  create,
  remove,
  update,
  searchByName,
};

export default coffeeServices;
