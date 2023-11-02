import axios from "axios";

const API_URL = "http://localhost:8080/";

const getCities = () => {
    return axios.get(API_URL + "cities");
};

const CitiesService = {
    getCities,
};

export default CitiesService;