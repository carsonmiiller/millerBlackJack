import React, { useContext, useEffect } from 'react';
import BlackJackLoginContext from '../context/BlackJackLoginContext';

export default function Logout() {
    const [loggedIn, setLoggedIn] = useContext(BlackJackLoginContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoggedIn(false);
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}