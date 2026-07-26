import axios from "axios";

const API = "http://127.0.0.1:8001";

export async function saveReport(report) {
  const res = await axios.post(
    `${API}/reports/generate`,
    report
  );

  return res.data;
}

export async function getReports() {
  const res = await axios.get(
    `${API}/reports`
  );

  return res.data;
}