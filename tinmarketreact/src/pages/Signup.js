import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {useStyles} from "../styles/AuthStyle";
import Paper from '@material-ui/core/Paper';
import {theme} from '/home/machine/IdeaProjects/tinmarketreact/src/styles/theme.js'
import {ThemeProvider} from '@material-ui/styles'
import AuthService from "/home/machine/IdeaProjects/tinmarketreact/src/services/auth.js";
import {useState} from "react"
import { useNavigate } from "react-router-dom";
import Container from '@material-ui/core/Container'

export default function SignUp() {
    const classes = useStyles()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const regist = (e) => {
        e.preventDefault();
        AuthService.reg(email, username, password).then(
            () => {
                navigate("/signin");
                window.location.reload();
            },
            (error) => {
                console.log(error.message)
            }
        );
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} style={{display:'flex', justifyContent:'center'}}>
                    <img src={'https://acdn.tinkoff.ru/static/documents/f3fd64bc-79e4-43a3-ace1-c5d76d5adac7.svg'} style={{maxWidth : '95%'}}/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Регистрация
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={regist}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="email"
                                autoFocus
                                onChange={e => setUsername(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                                onChange={e=> setEmail(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e=> setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Создать аккаунт
                            </Button>
                            <Container  style={{padding:0, display: "flex", flexDirection:"row", justifyContent: "space-between"}}>
                                <Link href="/signin" variant="body2" style={{textDecoration:'none'}}>
                                    {"Войти"}
                                </Link>
                                <Link href="/" variant="body2"  style={{textDecoration:'none'}}>
                                    {"На главную"}
                                </Link>
                            </Container>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}