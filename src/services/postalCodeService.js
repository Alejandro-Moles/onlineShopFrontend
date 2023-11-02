import axios from "axios";

const API_URL = "http://localhost:8080/";

const getPostalCode = () => {
    return axios.get(API_URL + "postalCodes");
};

const PostalCodeService = {
    getPostalCode,
};

export default PostalCodeService;