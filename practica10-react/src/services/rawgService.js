import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_KEY;
const BASE_URL = "https://api.rawg.io/api";

export const getPopularGames = () =>
    axios.get(`${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=20`);

export const searchGames = (query) =>
    axios.get(`${BASE_URL}/games?key=${API_KEY}&search=${query}&page_size=21`);

export const getGameDetails = (id) =>
    axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);
