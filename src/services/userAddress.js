import axios from "axios";

const API_URL = "http://localhost:8080/";

const getUserAddress = () => {
    return axios.get(API_URL + "userAddress");
};

const getAddress = (uuid) => {
    return axios.get(API_URL + `userAddress/${uuid}`);
};

const getUserAddressForUser = (uuid) => {
    return axios.get(API_URL + `userAddress/user/${uuid}`);
};

const createUserAddress = (userAddressDTO) => {
    console.log(userAddressDTO)
    const url = `${API_URL}userAddress`;
    return axios.post(url, userAddressDTO);
};


const UserAddressService = {
    getUserAddress,
    getUserAddressForUser,
    createUserAddress,
    getAddress
};


export default UserAddressService;