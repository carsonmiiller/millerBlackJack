import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Logout from '../auth/Logout';
import Table from '../content/Table';
import Home from '../content/Home';
import NoMatch from '../content/NoMatch';
import BlackJackLoginContext from '../context/BlackJackLoginContext';

function BlackJackApp() {
  const [tables, setTables] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setTables([1, 2, 3]);
  }, []);

  return (
    <BlackJackLoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout tables={tables} />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              {
                tables.map(table => {
                  return <Route key={table} path={`tables/${table}`} element={<Table name={table} />} />
                })
              }
              <Route path="*" element={<NoMatch />} />
            </Route>
          
        </Routes>
      </BrowserRouter>
    </BlackJackLoginContext.Provider>
  );
}

export default BlackJackApp;
