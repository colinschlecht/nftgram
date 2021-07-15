import axios from "axios";

export default axios.create({
  //dev
  //baseURL: "http://localhost:3000/api/v1"
  //prod
  baseURL: "https://nftgram-backend.herokuapp.com/api/v1",
});

// // ////! Needed for re-auth on page refresh
// // export const TOKEN = localStorage.token;
// // export const HEADERS = {
// //   headers: {
// //     Authorization: "Bearer " + TOKEN,
// //   },
// // };
