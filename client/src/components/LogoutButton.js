import React from 'react'

export default function LogoutButton() {
  const logout = () => {
    localStorage.removeItem('token-info');
    window.location.reload(false);
  };

  return (
    <div className="mainNavBar">
        <button id="LogoutButton" onClick={logout}>Logout</button>
    </div>
  )
}
