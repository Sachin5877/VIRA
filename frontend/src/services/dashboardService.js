import axios from "axios";

const API = "http://127.0.0.1:8001";

export async function getDashboardData() {
  const res = await axios.get(`${API}/dashboard`);
  return res.data;
}