import axios from "axios";

const API_URL = "http://localhost:8080/";

const getShopUser = () => {
    return axios.get(API_URL + "shopUsers");
};

const ShopUserService = {
    getShopUser
};


export default ShopUserService;