import axios from "axios";

const API_URL = "http://localhost:8080/";

const getUserAddress = () => {
    return axios.get(API_URL + "userAddress");
};

const UserAddressService = {
    getUserAddress
};


export default UserAddressService;