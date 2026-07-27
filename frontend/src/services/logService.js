import axios from "axios";

const API = "http://127.0.0.1:8001";

export async function getLogs(filename) {
  const res = await axios.get(
    `${API}/logs/${filename}`
  );

  return res.data;
}