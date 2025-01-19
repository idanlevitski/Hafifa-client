import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getLastDigit = async (id: string): Promise<string | undefined> => {
  try {
    return (await api.get(`/calc/${id}`)).data;
  } catch (e) {
    console.log(e);
  }
};

export const saveData = async (id: string, lastDigit: string) => {
  try {
    await api.post(
      "/save",
      {
        id,
        lastDigit,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.log(e);
  }
};
