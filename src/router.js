import Auth from "./pages/Auth/Auth"
import Todo from "./pages/Todo/Todo"

import {LOGIN_ROUTE, REGISTER_ROUTE, BOARD_ROUTE} from "./utils/consts"

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth
    },
    {
        path: '/',
        Component: Todo
    }
]