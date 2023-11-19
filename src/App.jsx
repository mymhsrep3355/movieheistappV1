import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/signup';
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path = "/login" element={<Login></Login>}></Route>
      <Route exact path='/signUp' element={<SignUp></SignUp>}></Route>
      <Route exact path = "/home" element={<Home></Home>}></Route>
    </Routes>
    </BrowserRouter>
  );
}
