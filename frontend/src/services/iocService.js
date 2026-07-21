import axios from "axios";

const API = "http://127.0.0.1:8000";

export async function getIOCs(filename) {
  const response = await axios.get(`${API}/ioc/${filename}`);
  return response.data;
}