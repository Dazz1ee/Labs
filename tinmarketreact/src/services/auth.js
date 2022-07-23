import axios from "axios";
const URL = "http://localhost:3000/tinmarket"


const reg = (email, username, password) => {
    return axios.post(URL +  "/signup", {
        username,
        email,
        password,
    })
};

const login = (username, password) => {
    return axios.post(URL + "/signin", {
        username,
        password,
    })
        .then((responce) => {
            console.log(responce)
            if(responce.data.username) {
                localStorage.setItem("user", JSON.stringify(responce.data));
            }
            return responce.data;
        })
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(URL + "/signout").then((response) => {
        return response.data;
    });

}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    reg,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;
