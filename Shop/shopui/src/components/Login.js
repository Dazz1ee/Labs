import React, { useState, useRef } from "react";
import { login } from "../actions/auth";
import {
    Alert,
    Avatar,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid, Link,
    TextField,
    ThemeProvider
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
const required = (value) => {
    if (!value) {
        return (
            <Alert severity="error">This field is required!</Alert>
        );
    }
};
const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        console.log(username)
        e.preventDefault();
            dispatch(login(username, password))
                .then(() => {
                    props.history.push("/home");
                    window.location.reload();
                    return <Redirect to="/home" />;
                })
    };
    if (isLoggedIn) {
        return <Redirect to="/home" />;
    }

    const theme = createTheme();

    return (
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    SignIn
                                </Typography>
                                <Box component="form"  ref={form} sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="username"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e)=> setPassword(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={handleLogin}
                                    >
                                        Sign In
                                    </Button>
                                    {password}
                                    {username}
                                    <Grid container>
                                        <Grid item>
                                            <Link href = "/registration" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>

                        </Container>
                    </ThemeProvider>
    );
};
export default Login;