import React, { useState, useRef } from "react";
import Footer from "./pages/Footer";
import Main from "./pages/Main";
import EditPopup from "./pages/EditPopup";
import AddPopup from "./pages/AddPopup";
import Login from "./pages/Login";
import LoginToken from './components/LoginToken';

function App() {
  const { token, checkLogin } = LoginToken();
  const [state, setState] = useState('login')
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleAddButtonClick = () => {
    setPopupVisible(true);
    console.log("trying to show popup, visibility ist jetzt " + popupVisible)
  };
 
  const login = (name, isAdmin) => {
    console.log("Login in Appjs")
    //e.preventDefault();
    console.log(name, isAdmin);
    const userData = {
      name,
      isAdmin
    };
    localStorage.setItem('token-info', JSON.stringify(userData));
    setIsLoggedin(true);
    setName(userData.name);
    if (userData.isAdmin === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setIsLoggedin(true);
    setState('main');
  };
 

  /*if (!token) {
    return (
      <>
      <Login checkLogin={checkLogin}/>
      <Footer />
      </>
    )
  }*/
  
  /*if (!isLoggedin) {
    setState('login')
  } else {
    setState('main')
  } */
  /*console.log("Logged in?: " +isLoggedin)
  console.log(typeof localStorage.getItem('token-info') != "undefined")
  if (typeof localStorage.getItem('token-info') != "undefined") {
    setState('main')
  } else {
    setState('login')
  } */

  return (
    <>
      {state === 'login' && <Login checkLogin={checkLogin} login={login}/>}
      <EditPopup visibility={popupVisible}/>
      <AddPopup visibility={popupVisible}/>
      {state === 'main' && <Main adminView={isAdmin} handleAddButtonClick={handleAddButtonClick}/>}
      <Footer />
    </>
  )
}

export default App;
