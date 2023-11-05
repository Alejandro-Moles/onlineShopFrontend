import axios from "axios";

const API_URL = "http://localhost:8080/";

const getPostalCode = () => {
    return axios.get(API_URL + "postalCodes");
};

const updatePostalCode = (uuid, postalCodeData) => {
    const url = `${API_URL}postalCodes/${uuid}`;
    return axios.put(url, postalCodeData);
}

const PostalCodeService = {
    getPostalCode,
    updatePostalCode
};

export default PostalCodeService;