import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getLastDigit = async (id: string): Promise<number | undefined> => {
  try {
    const lastDigit: number = (await api.get(`/${id}`)).data;
    return lastDigit;
  } catch (e) {
    console.log(e);
  }
};
