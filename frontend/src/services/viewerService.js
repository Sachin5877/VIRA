import api from "./api";

export const getLogData = async (filename) => {
  const response = await api.get(`/viewer/${filename}`);
  return response.data;
};