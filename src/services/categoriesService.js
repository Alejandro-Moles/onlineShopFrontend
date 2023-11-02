import axios from "axios";

const API_URL = "http://localhost:8080/";

const getCategories = () => {
    return axios.get(API_URL + "categories");
};

const updateCategories = (uuid, categoryData) => {
    const url = `${API_URL}categories/${uuid}`;
    return axios.put(url, categoryData);
}

const CategoriesService = {
    getCategories,
    updateCategories
};

export default CategoriesService;