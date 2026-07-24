import axios from "axios";

const API = "http://127.0.0.1:8001";

export async function askVira(question) {
  const response = await axios.post(`${API}/chat`, {
    question,
  });

  return response.data;
}