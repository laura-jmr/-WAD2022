import React from 'react'

export default function WelcomeMessage( {name} ) {
  return (
    <div className="mainNavBar">
        <p>Welcome {name}</p>
        <h1 id ="greetingHeader"></h1>
        <p>to Sola, enjoy!</p>
    </div>
  )
}
