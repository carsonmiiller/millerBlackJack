import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BadgerLayout from './BadgerLayout';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Logout from '../auth/Logout';
import BadgerChatroom from '../content/BadgerChatroom';
import BlackJackHome from '../content/BlackJackHome';
import BadgerNoMatch from '../content/BadgerNoMatch';
import BlackJackLoginContext from '../context/BlackJackLoginContext';

function BlackJackApp() {

  const [chatrooms, setChatrooms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('https://cs571.org/s23/hw6/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_f6cf574eb476d5ada941",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
    })
  }, []);

  return (
    <BlackJackLoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}>
              <Route index element={<BlackJackHome />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              {
                chatrooms.map(chatroom => {
                  return <Route key={chatroom} path={`chatrooms/${chatroom}`} element={<BadgerChatroom name={chatroom} />} />
                })
              }
              <Route path="*" element={<BadgerNoMatch />} />
            </Route>
          
        </Routes>
      </BrowserRouter>
    </BlackJackLoginContext.Provider>
  );
}

export default BlackJackApp;
