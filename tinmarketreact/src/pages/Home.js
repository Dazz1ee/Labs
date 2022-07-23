import * as React from 'react';
import {theme} from '/home/machine/IdeaProjects/tinmarketreact/src/styles/theme.js'
import {ThemeProvider} from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { yellow} from '@mui/material/colors'
import {Add} from "@mui/icons-material"
import InfoService from "../services/info"
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import ResponsiveAppBar from "../pages/ResponsiveAppBar"

export function Home(){
    const [products, setProducts] = useState([]);
    const [isClick, setIsClick] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:3000/tinmarket/")
            .then(res=>res.json())
            .then((result)=>{
                    setProducts(result);
                }
            )
    },[isClick])
    const addProduct = (e)=>{
        e.preventDefault();
       if(localStorage.getItem('user')) {
           InfoService.addToCart(e.target.id)
               .then(
                 setIsClick(!isClick)
               )
               .catch(error => {
                   console.log(error)
                   if(error == 401){
                       localStorage.removeItem("user")
                       navigate("/signin")
                       window.location.reload();
                   }
               })
       } else {
           navigate('/signin');
           window.location.reload();
       }
    }

    const deleteProduct = (e)=>{
        e.preventDefault();
        if(localStorage.getItem('user')) {
            InfoService.deleteFromCart(e.target.id)
                .then(
                    setIsClick(!isClick)
                )
                .catch(error => {
                    console.log(error)
                    if(error == 401){
                        localStorage.removeItem("user")
                        navigate("/signin")
                        window.location.reload();
                    }
                })
        } else {
            navigate('/signin');
            window.location.reload();
        }
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        color: '#ffffff',
        backgroundColor: yellow[500],
        border: "none",
        borderRadius: "8px",
        padding : "4px 12px",
        margin: '0',
        fontWeight: 'bold',
        fontFamily: 'Sawarabi Gothic, sans-serif',
        textTransform: 'none',
        fontSize: "13px",
        lineHeight: 1.5,
        letterSpacing: '-1px',
        textShadow: '0px 0px 1.3px black',


        '&:hover': {
            border: "none",
            backgroundColor: yellow[600],
        },
    }));

    const CustomIconButton = styled(IconButton)(({ theme }) => ({
        color: yellow[600],
        border: "none",
        backgroundColor: yellow[100],
        padding : "2px 2px",
        size: "small",
        margin: "25px 5px",
        backgroundSize: "10px",

        '&:hover': {
            border: "none",
            backgroundColor: yellow[200],
            color: yellow[700],
        },
    }));

    return (
        <ThemeProvider theme={theme}>
            <ResponsiveAppBar/>
            <Box style={{padding: '0 0 0 15%'}}>
                <Container style={{display:'inline-flex', flexWrap : 'wrap', textAlign:'center', justifyContent: 'flex-start', width: 'auto', height: '100vh', margin: '4vh 0 0 50px'}}>
                {products.map((product) =>
                        <Paper  key = {product.product.id} style = {{display: 'flex', flexDirection: 'column', width: '25%', mx:'20px', margin: '30px 30px', boxShadow: '0 0 0 0'}}>
                                {console.log('https://drive.google.com/file/d/' + product.path)}
                                <div style={{maxWidth: '100%', height: '55%', display: 'flex', justifyContent: 'flex-start'}}>
                                    <img src={'https://drive.google.com/uc?export=view&id=' + product.product.path} style={{maxWidth: '100%', height: '100%', alignSelf: 'top' }}/>
                                </div>
                                <Container style={{padding: '0 1px', height:'40%', width: '100%', display:'flex', alignItems: 'flex-start', flexDirection: 'column', textAlign: 'left'}}>
                                    <div>
                                        <Typography variant="h6" style={{margin: '5px 0 0 0', fontWeight: 'bold', fontFamily: 'arial,sans-serif', width: '100%'}}>
                                            {product.product.cost}₽
                                        </Typography>
                                        <Typography variant="body" style={{ fontFamily: 'Monospace', width: '100%'}}>{product.product.name}</Typography>
                                    </div>
                                    {!product.amount ?
                                        <ColorButton variant="outlined" style={{margin: '25px 0'}} id={product.product.id}
                                                     onClick={addProduct}>
                                            В корзину
                                        </ColorButton>
                                        :
                                        <Box style={{display: 'flex', flexDirection : 'row', alignItems: 'center'}}>
                                            <CustomIconButton onClick={addProduct} >
                                                <AddIcon style ={{width: '17px', height: '17px'}} id={product.product.id} />
                                            </CustomIconButton>
                                            <Typography style={{fontWeight: 'bold', fontFamily: 'Sawarabi Gothic, sans-serif', textTransform: 'none', fontSize: "13px",}}>{product.amount} шт.</Typography>
                                            <CustomIconButton onClick={deleteProduct}>
                                                <RemoveIcon style ={{width: '17px', height: '17px'}} id={product.product.id}/>
                                            </CustomIconButton>
                                        </Box>
                                    }
                                </Container>
                        </Paper>
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    )
}