import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart"
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import home from "./Home"
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import {Router, Switch, Route} from "react-router-dom";
import {Container, createTheme, Link, ThemeProvider} from "@mui/material";
import Box from "@mui/material/Box";
import Redirect from "react-router-dom/es/Redirect";
const App = () => {
    // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    // const [showAdminBoard, setShowAdminBoard] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);
    const logOut = () => {
        dispatch(logout());
    };
    console.log("!" + currentUser)
    const theme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#3f51b5',
            },
            secondary: {
                main: '#f50057',
            },
        },
    });
    return (
        <Router history={history}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>

                            <Link variant="h5"  sx={{ flexGrow: 1}} href={"/home"} color = "inherit" underline={"none"}>
                                TEST SHOP
                            </Link>
                        <Box>
                        {currentUser ? (
                            <Box>
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            color="inherit"
                                            aria-label="menu"
                                            sx={{ mr: 2 }}
                                            href={"/cart"}
                                        >
                                            <ShoppingCartIcon/>
                                        </IconButton>
                                    <Button color="inherit" href={"/login"} onClick={logOut}>LogOut</Button>
                            </Box>
                        ) : (
                            <Box>
                                        <Button color="inherit" href={"/login"}>Login</Button>
                                        <Button color="inherit" href={"/registration"}>Reg</Button>
                            </Box>
                        )}
                        </Box>
                    </Toolbar>
                </AppBar>
                    <Switch>
                        <Route exact path={["/", "/home"]} component={home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/registration" component={Register} />
                    </Switch>
            </ThemeProvider>
        </Router>
    );
};
export default App;

// import React, { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Router, Switch, Route, Link } from "react-router-dom";
//
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
//
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Home from "./Home";
//
// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";
//
// import { history } from "./helpers/history";
//
// // import AuthVerify from "./common/AuthVerify";
//
//
// const App = () => {
//     const [showModeratorBoard, setShowModeratorBoard] = useState(false);
//     const [showAdminBoard, setShowAdminBoard] = useState(false);
//
//     const { user: currentUser } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//
//     useEffect(() => {
//         history.listen((location) => {
//             dispatch(clearMessage()); // clear message when changing location
//         });
//     }, [dispatch]);
//
//     const logOut = useCallback(() => {
//         dispatch(logout());
//     }, [dispatch]);
//
//     useEffect(() => {
//         if (currentUser) {
//             setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
//             setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
//         } else {
//             setShowModeratorBoard(false);
//             setShowAdminBoard(false);
//         }
//
//     }, [currentUser, logOut]);
//
//     return (
//         <Router history={history}>
//             <div>
//                 <nav className="navbar navbar-expand navbar-dark bg-dark">
//                     <Link to={"/"} className="navbar-brand">
//                         bezKoder
//                     </Link>
//                     <div className="navbar-nav mr-auto">
//                         <li className="nav-item">
//                             <Link to={"/home"} className="nav-link">
//                                 Home
//                             </Link>
//                         </li>
//
//                         {currentUser && (
//                             <li className="nav-item">
//                                 <Link to={"/user"} className="nav-link">
//                                     User
//                                 </Link>
//                             </li>
//                         )}
//                     </div>
//
//                     {currentUser ? (
//                         <div className="navbar-nav ml-auto">
//                             <li className="nav-item">
//                                 <Link to={"/profile"} className="nav-link">
//                                     {currentUser.username}
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <a href="/login" className="nav-link" onClick={logOut}>
//                                     LogOut
//                                 </a>
//                             </li>
//                         </div>
//                     ) : (
//                         <div className="navbar-nav ml-auto">
//                             <li className="nav-item">
//                                 <Link to={"/login"} className="nav-link">
//                                     Login
//                                 </Link>
//                             </li>
//
//                             <li className="nav-item">
//                                 <Link to={"/register"} className="nav-link">
//                                     Sign Up
//                                 </Link>
//                             </li>
//                         </div>
//                     )}
//                 </nav>
//
//                 <div className="container mt-3">
//                     <Switch>
//                         <Route exact path={["/", "/home"]} component={Home} />
//                         <Route exact path="/login" component={Login} />
//                         <Route exact path="/register" component={Register} />
//                     </Switch>
//                 </div>
//
//                 {/* <AuthVerify logOut={logOut}/> */}
//             </div>
//         </Router>
//     );
// };
//
// export default App;