import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter"
import { observer } from 'mobx-react-lite';
import { Context } from '.';

function App() {
  const {user} = useContext(Context)
  console.log(user.isAuth)

  const [loading, setLoading] = useState(true)

    useEffect(() => {
        user.checkAuth().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default observer(App);
