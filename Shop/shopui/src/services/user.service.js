import authHeader from "./auth-header";
import axios from "axios";
const API_URL = "http://localhost:8080/shop/";
class UserService {
  const
  getPublicContent = () => {
    return axios.get(API_URL + "home", {headers: authHeader()});
  }
  const
  addToCart = (id) => {
    return axios.get(API_URL + "add?id=" + id, {headers: authHeader()})
  }

  const
  viewProductFromCart = () => {
    return axios.get(API_URL+"cart", {headers: authHeader()})
  }

  const
  handleRemoveOneProuct = (product, num)=> {
    return axios.post(API_URL + "cart/delete", {id: product.product.id, count: num}, {headers: authHeader()})
  }
}

export default new UserService();