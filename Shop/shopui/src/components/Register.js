import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";
import {Alert, Avatar, Container, createTheme, CssBaseline, Grid, Link, TextField, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Redirect from "react-router-dom/es/Redirect";
const required = (value) => {
    if (!value) {
        return (
            <Alert severity="error">This field is required!</Alert>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <Alert severity="error">The username must be between 3 and 20 characters.</Alert>
        );
    }
};
const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <Alert severity="error">The password must be between 6 and 40 characters..</Alert>
        );
    }
};
const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
            dispatch(register(username, password))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
    };
    if (successful) {
        return <Redirect to="/home" />;
    }
    return (
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} ref={form} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    name="username"
                                    autoComplete="username"
                                    validations={[required, vusername]}
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    validations={[required, vpassword]}
                                    value = {password}
                                    onChange = {e => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleRegister}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/*{message && (*/}
                {/*    <div className="form-group">*/}
                {/*        <Alert severity={ successful ? "success" :"error" }>{message}</Alert>*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*<CheckButton style={{ display: "none" }} ref={checkBtn} />*/}
            </Container>
    );
};
export default Register;