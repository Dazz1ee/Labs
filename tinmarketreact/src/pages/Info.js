import axios from "axios"
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import * as React from 'react';
import InfoService from '../services/info'
import AuthService from '../services/auth'
import ResponsiveAppBar from './ResponsiveAppBar'
import {yellow} from '@material-ui/core/colors';
import { styled } from '@mui/material/styles'
import Typography from '@material-ui/core/Typography'

export default function Info(props){
        const hiddenFileInput = React.useRef(null);
        const user = AuthService.getCurrentUser();

        const handleClick = event => {
            hiddenFileInput.current.click();
        };
        const handleChange = event => {
            event.preventDefault();
            console.log(event.target.form)
            const fileUploaded = event.target.files[0];
            console.log(fileUploaded)
            const formData = new FormData(event.target.form);
            InfoService.setAvatar(fileUploaded).then((res) => {
                console.log(res)
                user.path = res.data;
                console.log(user)
                localStorage.setItem("user", JSON.stringify(user));
                window.location.reload()


            }).catch(e=>console.log(e))
        };

    const ColorButton = styled(Button)(({ theme }) => ({
        color: '#ffffff',
        backgroundColor: yellow[600],
        border: "none",
        borderRadius: "4px",
        padding : "8px 12px",
        fontWeight: 'bold',
        fontFamily: 'arial,sans-serif',
        margin: '20px 0',
        lineHeight: 1.5,
        letterSpacing: '-1px',
        textShadow: '0.5px -0.5px 0.5px lightgray',

        width: '100%',


        '&:hover': {
            border: "none",
            backgroundColor: yellow[700],
        },
    }));

        return (
            <React.Fragment>
                <ResponsiveAppBar/>
                <Typography variant= 'h4' style={{margin: '100px 0 0 60px ', fontFamily: 'arial,sans-serif'}}>НАСТРОЙКА ПРОФИЛЯ</Typography>
                <Box style={{margin: '80px 60px', display:'flex', flexDirection:'row', width:'100%'}}>
                    <Box style={{alignItems:'center'}}>
                        <img src={user && user.path ? 'https://drive.google.com/uc?export=view&id=' + user.path : '/static/images/avatar/2.jpg'}/>
                        <form onSubmit={handleClick}>
                            <ColorButton onClick ={handleClick}>
                                Загрузить...
                            </ColorButton>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{display: 'none'}}
                            />
                        </form>
                    </Box>
                    <Box style={{marginLeft: '50px'}}>
                        <Typography style={{fontWeight: 'bold', fontFamily: 'arial,sans-serif', marginBottom:'5px'}}>имя пользователя: {user.username}</Typography>
                        <Typography style={{fontWeight: 'bold', fontFamily: 'arial,sans-serif'}}>email: {user.email}</Typography>
                    </Box>
                </Box>
            </React.Fragment>
        );
}