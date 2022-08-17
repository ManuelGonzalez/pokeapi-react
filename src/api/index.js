import axios from "axios";

export const getPokemons = (limit, offset) => {

  const params = new URLSearchParams([['limit', limit], ['offset', offset]]);

  const axiosInstance = axios.create({
    params,
    baseURL: "https://pokeapi-manuel.herokuapp.com/pokemon",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      accept: "application/json",
    },
  });

  return (
    axiosInstance
      .get("")
      .then((res) => res.data)
      .catch((error) => console.log(error))
  );
};
