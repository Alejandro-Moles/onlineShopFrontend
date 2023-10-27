import axios from "axios";

const API_URL = "http://localhost:8080/";

const getPlatforms = () => {
    return axios.get(API_URL + "platforms");
};

const PlatformsSrvice = {
    getPlatforms,
};

export default PlatformsSrvice;