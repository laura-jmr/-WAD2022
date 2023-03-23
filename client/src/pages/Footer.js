import React from 'react';
import Contact from '../components/Contact';
import Copyright from '../components/Copyright';
import Policy from '../components/Policy';

export default function Footer() {
  return (
    <div id="footerContainer">
        <div className="footer">
            <Contact />
            <Copyright />
            <Policy />
        </div>
    </div>
  )
}
