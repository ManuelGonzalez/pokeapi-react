import axios from "axios";
import {ENDPOINT} from "../constants/environment";

export const getPokemons = (limit, offset) => {

  const params = new URLSearchParams([['limit', limit], ['offset', offset]]);

  const axiosInstance = axios.create({
    params,
    baseURL: ENDPOINT,
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
