import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { jwtDecode } from "jwt-decode";
import { LOGIN_ROUTE } from "./utils/consts";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          user.setUser({});
          user.setIsAuth(false);
        } else {
          user.setUser(decodedToken);
          user.setIsAuth(true);
        }
      } catch (error) {
        console.error("decode token error:", error);
        localStorage.removeItem("token");
        user.setUser({});
        user.setIsAuth(false);
      }
    }

    user
      .checkAuth()
      .then(() => {
        user.setIsAuth(true);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.warn("End of session.");
          localStorage.removeItem("token");
          user.setUser({});
          user.setIsAuth(false);
          setAuthError(true);
        } else {
          console.error("authorizate error:", error);
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      {authError ? <NavLink to={LOGIN_ROUTE} /> : <AppRouter />}
    </BrowserRouter>
  );
});

export default App;
