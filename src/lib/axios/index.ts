import axios from "axios";

export const api = axios.create({
    baseURL: "https://aurora-map.vercel.app/api",
})
