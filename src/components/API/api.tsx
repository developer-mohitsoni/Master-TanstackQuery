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

export const fetchInvPost = async (id: number) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
};

/// to update the post
export const updatePost = (id: number) => {
  return api.put(`/posts/${id}`, { title: "I have updated" });
};
