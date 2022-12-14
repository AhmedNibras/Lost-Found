import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

export const createItem = (itemData) => API.post("/items", itemData);
export const getItems = () => API.get("/items");
export const getItem = (id) => API.get(`/items/${id}`);
export const updateItem = ( updatedItemData, id ) =>
  API.patch(`/items/${id}`, updatedItemData);
export const getItemsByUser = (userId) => API.get(`/items/userItems/${userId}`);
