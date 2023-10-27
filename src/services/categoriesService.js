import axios from "axios";

const API_URL = "http://localhost:8080/";

const getCategories = () => {
    return axios.get(API_URL + "categories");
};

const CategoriesService = {
    getCategories,
};

export default CategoriesService;