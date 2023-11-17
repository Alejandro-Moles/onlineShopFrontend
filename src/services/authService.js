import axios from "axios";

const API_URL = "http://localhost:8080/auth";


const registerUser = (registerData) => {
    console.log(registerData)
    const url = `${API_URL}/register`;
    return axios.post(url, registerData);
};

const loginUser = (loginData) => {
    const url = `${API_URL}/login`;
    return axios.post(url, loginData, { withCredentials: true });
}

const logOutUser = () => {
    const url = `${API_URL}/logOut`;
    return axios.get(url, { withCredentials: true });
}

const AuthService = {
    registerUser,
    loginUser,
    logOutUser
};

export default AuthService;