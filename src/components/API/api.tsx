import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// to fetch the data
export const fetchPosts = async (pageNumber: number) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
