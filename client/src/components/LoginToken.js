import React, { useState } from 'react'

export default function LoginToken() {
    const getLoginToken = () => {
        const tokenString = sessionStorage.getItem('loginToken');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const [loginToken, checkLogin] = useState(getLoginToken());

    const saveToken = userToken => {
        sessionStorage.setItem('loginToken', JSON.stringify(userToken));
        checkLogin(userToken.loginToken);
    };

    return {
        checkLogin: saveToken,
        loginToken
    }
}
