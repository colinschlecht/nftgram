import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

////! Needed for re-auth on page refresh
const TOKEN = localStorage.token;
export const HEADERS = {
  headers: {
    Authorization: "Bearer " + TOKEN,
  },
};
