import axios from "axios";
import { ENDPOINT } from "../constants/environment";

export const getData = (catalog) => {
  const axiosInstance = axios.create({
    baseURL: ENDPOINT,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      accept: "application/json",
    },
  });

  return (
    axiosInstance
      .get(catalog)
      .then((res) => res)
      .catch((error) => console.log(error))
  );
};
