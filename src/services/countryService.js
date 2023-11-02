import axios from "axios";

const API_URL = "http://localhost:8080/";

const getCountries = () => {
    return axios.get(API_URL + "countries");
};

const CountriesService = {
    getCountries,
};

export default CountriesService;