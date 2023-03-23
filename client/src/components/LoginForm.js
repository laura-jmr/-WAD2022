import React, { useState } from 'react'

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <form className="form" id="loginForm" onSubmit={handleSubmit}>
      <div id="loginDiv">
        <h2 className="FormTitle">Login</h2>
        <div className="FormInputGroup">
            <input type="text" className="FormInput" id="username" name="username" placeholder="Username" value={username} required onChange={(event) => setUsername(event.target.value)}></input>
            <input type="password" className="FormInput" id="password" name="password" placeholder="Password" value={password} required onChange={(event) => setPassword(event.target.value)}></input>
            <div id="loginFormButtons">
                <button className="FormButton" id="LoginButtonLogin" type="submit">Login</button>
                <button className="FormButton" id="CancelButtonLogin" onClick={refreshPage} type="button">Cancel</button>
            </div>
            <div id="login-error-response"></div>
        </div>
      </div>
    </form>
  )
}
