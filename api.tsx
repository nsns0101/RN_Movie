const API_KEY = "b5ff37f3b8cb4ef5dc5c2bbda9d2c6e8";
const BASE_URL = "https://api.themoviedb.org/3";

export const getNowPlaying = () => 
    fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
    ).then(res => res.json());

export const upcoming = () => 
    fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
    ).then(res => res.json());

export const getTrending = () =>
    fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    ).then(res => res.json());

