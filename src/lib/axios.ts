import axios from "axios";

const TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN || "";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});