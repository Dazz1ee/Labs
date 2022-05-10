import axios from "axios";

const API_URL = "http://localhost:8080/shop/auth/"
const register = (username, password) => {
    return axios.post(API_URL+"registration", {
        username,
        password,
    });
};
const login = (username, passwrod) => {
    console.log("1 " + username)
    console.log("pas " + username)
    return axios
        .post(API_URL + "login", {
        "name": username,
        "password" : passwrod,
    })
        .then((response) => {
            console.log(response.data)
        if (response.data) {
            localStorage.setItem("token", response.data);
            console.log(localStorage.getItem("token"))
        }
        return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};
export default {
    register,
    login,
    logout,
};
