import axios from "axios";

const API_URL = "http://localhost:8080/";

const getCities = () => {
    return axios.get(API_URL + "cities");
};

const updateCity = (uuid, cityData) => {
    const url = `${API_URL}cities/${uuid}`;
    return axios.put(url, cityData);
}

const CitiesService = {
    getCities,
    updateCity
};

export default CitiesService;