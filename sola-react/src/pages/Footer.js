import React from "react";
import "../index.css";

export default function Footer({ address, copyright, termslink, policylink, impressumlink }) {
    return (
        <div id="footerContainer">
            <div class="footer">
                <div class="footerContactContainer">
                    <p class="footerH">Contact</p>
                    <div class="footerText">
                        <p>{address}</p>
                    </div>
                </div>
                <div class="footerCopyright">
                    <p>{copyright}</p>
                </div>
                <div class="footerPolicyContainer">
                    <a href={termslink}>Terms</a>
                    <a href={policylink}>Policy & Safety</a>
                    <a href={impressumlink}>Impressum</a>
                </div>
            </div>
        </div>
    )
}