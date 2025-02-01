import React from "react";
import {Routes, Route, Navigate} from "react-router-dom"
import { TodoRoutes } from "../router";

const AppRoute = () => {
    return (
        <Routes>
            {TodoRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact />
            )}

            <Route path="*" element={<Navigate to={'/'} replace />} />

        </Routes>
    )
}

export default AppRoute