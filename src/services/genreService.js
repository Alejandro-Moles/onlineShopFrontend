import axios from "axios";

const API_URL = "http://localhost:8080/";

const getGenres = () => {
    return axios.get(API_URL + "genres");
};

const GenreService = {
    getGenres,
};

export default GenreService;