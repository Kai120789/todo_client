import React, { useContext } from "react";
import {Routes, Route, Navigate} from "react-router-dom"
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { authRoutes, publicRoutes } from "../router";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            <Route path="*" element={<Navigate to={'/'} replace />} />
        </Routes>
    );
});

export default AppRouter