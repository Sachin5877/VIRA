import axios from "axios";

const API = "http://127.0.0.1:8000";

export async function investigateLog(filename) {
  const response = await axios.post(
    `${API}/investigate/${filename}`
  );

  return response.data;
}