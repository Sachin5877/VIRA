import axios from "axios";

const API = "http://127.0.0.1:8001";

export async function getMitre(filename) {
  const response = await axios.get(`${API}/mitre/${filename}`);
  return response.data;
}