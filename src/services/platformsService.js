import axios from "axios";

const API_URL = "http://localhost:8080/";

const getPlatforms = () => {
    return axios.get(API_URL + "platforms");
};

const updatePlatforms = (uuid, platformData) => {
    const url = `${API_URL}platforms/${uuid}`;
    return axios.put(url, platformData);
}

const createPlatform = (platformData) => {
    const url = `${API_URL}platforms`;
    return axios.post(url, platformData);
};

const PlatformsService = {
    getPlatforms,
    updatePlatforms,
    createPlatform
};

export default PlatformsService;