import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// to fetch the data
export const fetchPosts = async () => {
  try {
    const res = await api.get("/posts");
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
