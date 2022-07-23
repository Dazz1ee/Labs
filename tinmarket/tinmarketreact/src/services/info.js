
import axios from "axios"

const URL = "http://localhost:3000/tinmarket/"

const getAllProducts = () => {
    axios.get(URL).then(result => {return(result.data)})
};

const setAvatar = (form) => {
    return axios.post(URL+"upload",{ file:form }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const getCart = ()=>{
    return axios.get(URL + "cart");
}
const addToCart = (id) => {
    return axios.get(URL + "add?id=" + id);
}

const deleteFromCart = (id) => {
    return axios.get(URL + "cart/delete?id=" + id);
}



const totalDelete = (id) => {
    return axios.get(URL + "cart/totaldelete?id=" + id);
}

const InfoService = {
    getAllProducts,
    setAvatar,
    getCart,
    addToCart,
    deleteFromCart,
    totalDelete
}
export default InfoService;