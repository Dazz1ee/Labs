export default function authHeader(){
    const token = localStorage.getItem("token");
    console.log("ah " + token)
    if(token){
        return { Authorization: 'Bearer ' + token};
    } else {
        return {};
    }
}