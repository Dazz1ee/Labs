import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useEffect, useState} from "react";
import {Alert, AlertTitle, Container, Paper, Snackbar} from "@mui/material";
import UserService from "./services/user.service"
import {Add} from "@mui/icons-material";
import Redirect from "react-router-dom/es/Redirect";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [stateAlert, setStateAlert] = useState(false);
    const [err, setErr] = useState(false);
    const [nameProduct, setNameProduct] = useState(false);
    React.useEffect(()=>{
        fetch("http://localhost:8080/shop/home?page=0")
            .then(res=>res.json())
            .then((result)=>{
                    setProducts(result);
                }
            )
    },[])
    const styleProduct={maxWidth: '40%', margin: '10px 0' }
    const addProduct = (e)=>{
        UserService.addToCart(e.target.id)
            .then(
                res=>{
                        setStateAlert(true)
                        console.log(stateAlert)
                        setNameProduct(e.target.value)
                }
            )
            .catch(error => {
                console.log(error)
                if(error.request.status == 401) {
                    console.log("a")
                    setErr(true)
                }
            })
    }
    if(err){
        return <Redirect to="/login" />
    }
    return (
        <Box sx={{ flexGrow: 1}} m = "50px 120px">
            <Box sx={{display:'flex', flexWrap : 'wrap', textAlign:'center', justifyContent: 'center'}}>
                {
                    products.map(product =>
                        <Paper key={product.id} elevation={1} sx = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', width: '35%', justifyContent: 'space-between', mx:'20px', my: '30px', boxShadow: "0px 6px 23px -8px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)", borderRadius : "20px"}}>
                            <img src={product.image} style={styleProduct}></img>
                            <Typography variant="h6">{product.name}</Typography>
                            <Button  value={product.name} id={product.id} variant="contained" sx={{alignSelf: 'end', margin:'10px 5px', padding : "3px 10px"}} startIcon={<Add/>}
                            onClick={addProduct}>
                                {product.cost}
                            </Button>
                        </Paper>
                    )
                }
            </Box>
            <Snackbar open={stateAlert} autoHideDuration={6000} onClose={()=>setStateAlert(false)}>
                <Alert onClose={()=>setStateAlert(false)} severity="success" sx={{ width: '100%' }}>
                    Товар "{nameProduct}" добавлен в корзину
                </Alert>
            </Snackbar>
        </Box>
    );
}
