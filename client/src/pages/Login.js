import React, { useState } from 'react';
import LoginTitle from "../components/LoginTitle";
import LoginForm from "../components/LoginForm";

export default function Login( {login }) {
  
  const handleLogin = async (username, password) => {
    console.log("trying to login as " + username + " with " + password)
    try {
      const userResponse = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
       });

        console.log(userResponse)
      if (!userResponse.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await userResponse.json();
      console.log(data); // replace with desired behavior
      login(data.username, data.role);
    } catch (error) {
      console.error(error);
      alert("Wrong login!")
    }
  };



  return (
    <div id="login">
      <LoginTitle />
      <LoginForm handleLogin={handleLogin}/>
    </div>
  )
};