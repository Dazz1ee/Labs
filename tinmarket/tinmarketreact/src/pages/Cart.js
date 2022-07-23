import * as React from 'react';
import ResponsiveAppBar from './ResponsiveAppBar'
import {theme} from '/home/machine/IdeaProjects/tinmarketreact/src/styles/theme.js'
import {ThemeProvider } from '@mui/material/styles';
import {useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useStyles} from '../styles/CartStyle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {yellow} from '@material-ui/core/colors';
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import {CustomInput, CustomTypography} from '../styles/CustomInput'
import InfoService from "../services/info"


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function Cart(){
    const [isClick, setIsClick] = useState(false)
    const [products, setProducts] = useState([])
    const [indexes, setIndexes] = React.useState([]);
    const classes = useStyles()

    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null
    };

    const iconComponent = (props) => {
        return (
            <ExpandMoreIcon className={props.className + " " + classes.icon}/>
        )};


    useEffect(()=>{
        fetch("http://localhost:3000/tinmarket/cart")
            .then(res=>res.json())
            .then((result)=>{
                    console.log(result[0].product.name)
                    setProducts(result);
                    let temp =[];
                    for (let i = 0; i < products.length; i++) {
                        temp.push(1)
                    }
                    setIndexes(temp)
                }
            )
    },[isClick])

    const styleImg = {
        width : 'auto',
        height: '100%',
    }

    const styleBlock = {
        height: '100%',
        width: '45%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }


    const menuItem = (max) => {
        let mas = [];
        for (let i = 0; i < max; i++) {
            mas.push(i + 1);
        }
        return mas;
    }

    const handleChange = (event, index) => {
        console.log(event, index, indexes)
            let  temp =  Object.assign([],indexes)
        temp[index] = event.target.value
        setIndexes(temp)

    };

    const ColorButton = styled(Button)(({ theme }) => ({
        color: '#ffffff',
        backgroundColor: yellow[600],
        border: "none",
        borderRadius: "8px",
        padding : "8px 12px",
        fontWeight: 'bold',
        fontFamily: 'arial,sans-serif',
        margin: '0',
        lineHeight: 1.5,
        letterSpacing: '-1px',
        textShadow: '0.5px -0.5px 0.5px lightgray',
        top: '-30px',
        marginLeft: '15%',
        width: '70%',


        '&:hover': {
            border: "none",
            backgroundColor: yellow[700],
        },
    }));

    
    const totalsum = () => {
        let res = 0
        products.map((product, index) => {
            if (indexes[index]) {
                res += indexes[index] * product.product.cost
            }
        })
        return res;
    }
    
    const deleteProduct = (e) => {
        e.preventDefault();
        InfoService.totalDelete(e.target.id)
        setIsClick(!isClick);
    }

    return(
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar/>
                    <Typography className={classes.typcart} variant = 'h5'>Корзина</Typography>
                <div>
                    <Box style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                        <Box className={classes.box}/>
                        <Box style={{display:'flex', flexDirection:'column', width:'30%', height:'auto', textAlign:'center'}}>
                            <ColorButton >Оформить заказ</ColorButton>
                            <Typography style={{left:'-10px',fontFamily: 'arial,sans-serif'}}>К оплате {totalsum()}</Typography>
                        </Box>
                    </Box>
                    <Box style={{display:'flex', flexDirection:'column', height: '100vh', padding:'0', margin:'0'}}>
                        <Box  style={{display:'flex', flexDirection:'column', height: '100vh', padding:'0', margin:'0'}}>
                        {products.map((product, index) =>
                            <Container style={{padding:'15px' , height: '25%', width: '60%',display: 'flex', margin: '5px 55px'}} id={index}>
                                <Container style={{width: '20%', backgroundColor:'#fff', display: 'flex', justifyContent: 'center'}}>
                                    <img src={'https://drive.google.com/uc?export=view&id=' + product.product.path} style={styleImg}/>
                                </Container>
                                <Container style={styleBlock}>
                                    <div>
                                        <Typography style={{ fontFamily: 'arial,sans-serif', fontSize:'13px'}}>{product.product.name}</Typography>
                                        <CustomTypography id ={product.product.id} onClick={deleteProduct}>удалить</CustomTypography>
                                    </div>
                                    <Typography style={{fontWeight: 'bold', fontFamily: 'Sawarabi Gothic, sans-serif', fontSize:'13px'}}>{indexes[index] ? product.product.cost * indexes[index]: product.product.cost}</Typography>
                                </Container>
                                <Box style={{height: '10px', width:'10%',display: 'flex', alignItems:'center'}}>
                                    <FormControl sx={{ m: 1, maxWidth:'100%', maxHeight:'100%', minWidth:'50px', height:'10px', textOverflow:'', alignItems:'center'}} size="small">
                                        <Select
                                            value={indexes[index]}
                                            onChange={e=>handleChange(e,index)}
                                            disableUnderline
                                            classes={{ root: classes.select }}
                                            MenuProps={menuProps}
                                            IconComponent={iconComponent}
                                            style={{fontSize: '10px',textOverflow:''}}
                                        >
                                            {menuItem(product.amount).map((ind) =>
                                                <MenuItem  value={ind} style = {{fontSize: '10px', textOverflow:''}}key={product.product.name + ind}>{ind}</MenuItem>
                                            )}
                                        </Select>
                                        <CustomInput >Шт</CustomInput>
                                    </FormControl>
                                </Box>
                            </Container>
                        )}
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}