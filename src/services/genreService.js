import axios from "axios";

const API_URL = "http://localhost:8080/";

const getGenres = () => {
    return axios.get(API_URL + "genres");
};

const getAvailableGenres = () => {
    return axios.get(API_URL + "genres/availableGenres");
};

const updateGenre = (uuid, genreData) => {
    const url = `${API_URL}genres/${uuid}`;
    return axios.put(url, genreData);
}

const createGenre = (genreData) => {
    const url = `${API_URL}genres`;
    return axios.post(url, genreData);
};

const GenreService = {
    getGenres,
    updateGenre,
    createGenre,
    getAvailableGenres
};

export default GenreService;