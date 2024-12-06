import axiosModule from "axios";

export const axios = axiosModule.create({
    baseURL: import.meta.env.VITE_API_URL,
});