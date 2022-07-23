import './App.css';
import {BrowserRouter, Routes,  Redirect, Route, Router, Switch} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import {Home} from "./pages/Home";
import AuthService from "./services/auth"
import Cart from "./pages/Cart"
import Info from "./pages/Info"

function App() {
    const currentUser = AuthService.getCurrentUser();

  return (
          <BrowserRouter>
              <Routes>
                  <Route path='/signin' element = {<Login />}/>
                  <Route path='/signup' element = {<SignUp/>}/>
                  <Route path='/' element = {<Home/>}/>
                  <Route path='/cart' element = {currentUser ? <Cart/> : <Login/>} />
                  <Route path='/info' element = {currentUser ? <Info/> : <Login/>} />
                  <Route path='*' element={<Home/>}/>
              </Routes>
          </BrowserRouter>
  )
}

export default App;
