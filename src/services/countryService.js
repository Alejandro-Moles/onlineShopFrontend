import axios from "axios";

const API_URL = "http://localhost:8080/";

const getCountries = () => {
    return axios.get(API_URL + "countries");
};

const updateCountry = (uuid, countryData) => {
    const url = `${API_URL}countries/${uuid}`;
    return axios.put(url, countryData);
}

const createCountry = (countryData) => {
    const url = `${API_URL}countries`;
    return axios.post(url, countryData);
};

const CountriesService = {
    getCountries,
    updateCountry,
    createCountry
};

export default CountriesService;