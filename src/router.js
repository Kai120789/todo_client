import Auth from "./pages/Auth"
import Todo from "./pages/Todo"
import BoardPage from "./pages/BoardPage"

import {LOGIN_ROUTE, REGISTER_ROUTE, BOARD_ROUTE} from "./utils/consts"

export const TodoRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth
    },
    {
        path: BOARD_ROUTE + '/:id',
        Component: BoardPage
    },
    {
        path: '/',
        Component: Todo
    }
]