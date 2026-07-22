import axios from "axios";

const API = "http://127.0.0.1:8001";

export async function getTimeline(filename) {
  const response = await axios.get(`${API}/timeline/${filename}`);
  return response.data;
}