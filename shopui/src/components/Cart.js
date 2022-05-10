import {useEffect, useState} from "react";
import {Card, CardActions, CardContent, CardMedia, Container, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Redirect from "react-router-dom/es/Redirect";

import userService from "../services/user.service";
import IconButton from "@mui/material/IconButton";
import {TransitionGroup} from "react-transition-group";
import {BadgeUnstyled, badgeUnstyledClasses} from "@mui/base";
import axios from "axios";
import authHeader from "../services/auth-header";
import UserService from "../services/user.service";
import {useNavigate} from "react-router";


export default function Cart (){
    const [products, setProducts] = useState([]);
    const[renderProduct, setRenderProduct] = useState(1)
        useEffect(() => {
            userService.viewProductFromCart()
                .then(response => {
                    console.log(response)
                    setProducts(response.data)
                })
                .catch(error => {
                    //console.log(error)
                    if (error.request.status === 401) {
                    }
                })
        }, [renderProduct])
     function clickMinus(product, num){
         setProducts([])
        console.log(product.count)
         UserService.handleRemoveOneProuct(product,num);
         if(product.count === num){
             window.location.reload()
         }
         setRenderProduct(renderProduct + 1)
     }

    const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    min-width: 10px;
    height: 20px;
    padding: 0 5px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #3f51b5;
    border-radius: 20px;
    box-shadow: 3 0 0 5px #fff;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(70%, -40%);
    transform-origin: 100% 0;
  }
`;


    return(
        <Container sx={{display:"flex", flexDirection:"column", alignItems: "center", padding: "30px 50px "}}>
            <TransitionGroup>
            {
                products.map(product =>
                    <Card key={product.id} sx={{ Width: 525, backgroundColor: "rgb(0 0 0 / 4%)", margin : "30px"}}>
                    <CardMedia
                    component="img"
                    alt="product"
                    height="400"
                    image={product.product.image}
                    />
                    <CardContent>
                        <StyledBadge badgeContent={product.count}>
                            <Typography gutterBottom variant="h4" component="div">
                                {product.product.name}
                            </Typography>
                        </StyledBadge>
                    </CardContent>
                    <CardActions sx = {{justifyContent: "space-between"}} onChange={()=>clickMinus(product,1)}>
                            <IconButton sx={{color :"rgb(101, 115, 195)"}} aria-label="minus">
                                <RemoveIcon onClick={()=>clickMinus(product,1)}/>
                            </IconButton>
                        <Button size="small" endIcon={<DeleteOutlineIcon/>} onClick={()=>clickMinus(product,product.count)}>DELETE</Button>
                    </CardActions>
                    </Card>
                )
            }
            </TransitionGroup>
        </Container>
    );
}