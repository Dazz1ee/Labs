import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AuthService from '../services/auth'
import '../styles/App.css'

function ElevationScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

const currentUser = AuthService.getCurrentUser();

const settings = ['Корзина', 'Аккаунт'];

currentUser ? settings.push('Выход') : settings.push('Войти')

const ResponsiveAppBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenu = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        if(e.target.id == 0){
            console.log(currentUser)
            if(currentUser) {
                navigate('/cart')
                window.location.reload()
            } else {
                navigate('/signin')
                window.location.reload()
            }
        } else if(e.target.id == 1){
            if(currentUser) {
                navigate('/info')
                window.location.reload()
            } else {
                navigate('/signin')
                window.location.reload()
            }
        } else if(e.target.id == 2 && currentUser){
            AuthService.logout();
            window.location.reload()
        } else if(e.target.id == 2){
            navigate('/signin');
            window.location.reload()
        }
    }

    return (
            <ElevationScroll {...props}  style={{height:'7vh'}}>
                <AppBar >
                        <Toolbar style={{display:'flex', justifyContent:'space-between', height:'7vh', alignItems:'center', minHeight: 0, backgroundColor: '#FFF'}}>
                                <img src={'https://acdn.tinkoff.ru/static/documents/ff59e890-eb57-4b28-971f-cfdda8b10a7a.svg'} style={{width: '11%',
                                cursor:'pointer'}}  onClick={e=>{navigate('/'); window.location.reload()}} className="scale"/>
                            <Box sx={{ flexGrow: 0, maxHeight:'100%'}}>
                                <Tooltip title="Меню">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, width:'1%', height:'1%'}}>
                                            <Avatar alt="Remy Sharp" src={currentUser && currentUser.path ? 'https://drive.google.com/uc?export=view&id=' +currentUser.path : '/static/images/avatar/2.jpg'} style={{width:'28px', height:'28px', fontSize: '1.0rem',color: '#fff', backgroundColor: '#ffeb3b', textShadow: '0px 0px 1px black'}}></Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '25px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem onClick={handleMenu} key={setting}>
                                            <Typography textAlign="center" id={settings.indexOf(setting)}>{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                </AppBar>
            </ElevationScroll>
    );
};
export default ResponsiveAppBar;