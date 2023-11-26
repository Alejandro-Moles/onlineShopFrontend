import axios from "axios";

const API_URL = "http://localhost:8080/";

const getRoles = () => {
    return axios.get(API_URL + "roles");
};

const RoleService = {
    getRoles
};

export default RoleService;