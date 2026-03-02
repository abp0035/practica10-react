import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_KEY;
const BASE_URL = "/api";

export const getPopularGames = (page = 1) =>
    axios.get(`${BASE_URL}/games?key=${API_KEY}&ordering=-rating&page_size=20&page=${page}`);

export const searchGames = (query, page = 1) =>
    axios.get(`${BASE_URL}/games?key=${API_KEY}&search=${query}&page_size=20&page=${page}`);

export const getGameDetails = (id) =>
    axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);

export const getGamesByTag = (tag, page = 1) =>
    axios.get(`${BASE_URL}/games?key=${API_KEY}&tags=${tag}&page_size=20&page=${page}`);

export const getGamesByGenre = (genre, page = 1) =>
    axios.get(`${BASE_URL}/games?key=${API_KEY}&genres=${genre}&page_size=20&page=${page}`);

export const getPublisherDetails = (id) =>
    axios.get(`${BASE_URL}/publishers/${id}?key=${API_KEY}`);

export const getGamesByPublisher = (id, page = 1) =>
    axios.get(`${BASE_URL}/games?key=${API_KEY}&publishers=${id}&page_size=20&page=${page}`);

export const getPublishers = (page = 1) =>
    axios.get(`${BASE_URL}/publishers?key=${API_KEY}&page_size=20&page=${page}`);

export const searchPublishers = (query, page = 1) =>
    axios.get(`${BASE_URL}/publishers?key=${API_KEY}&search=${query}&page_size=20&page=${page}`);
