import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter, useNavigate} from "react-router-dom"
import AppRouter from "./components/AppRouter"
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import {jwtDecode} from "jwt-decode"


function App() {
  const {user} = useContext(Context)
  console.log(user.isAuth)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      user.setUser(jwtDecode(token));
      user.setIsAuth(true);
    }

    user.checkAuth()
      .then(data => {
          user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
