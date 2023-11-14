import { Dashboard } from "../../view/Dashboard"
import { Home } from "../../view/Home"
import { Login } from "../../view/Login"
import { Events } from '../../view/Events'
import UsersBoard from "../UsersBoard"
import UpcomingCalendar from "../UpcomingCalendar"
import MyEvents from "../MyEvents"

export const nav = [
    {
        path: "/",
        name: "Home",
        element: <Home />,
        isMenu: true,
        protected_route: false
    },
    {
        path: "/login",
        name: "Login",
        element: <Login />,
        isMenu: false,
        protected_route: false
    },
    {
        path: "/events",
        name: "Events",
        element: <Events />,
        isMenu: true,
        protected_route: false
    },
    {
        path: "/users",
        name: "Users",
        element: <UsersBoard />,
        isMenu: true,
        protected_route: true,
        min_role: 'admin'
    },
    {
        path: "/calendar",
        name: "UpcomingCalendar",
        element: <UpcomingCalendar />,
        isMenu: true,
        protected_route: true,
        min_role: 'member'
    },
    {
        path: "/myevents",
        name: "MyEvents",
        element: <MyEvents />,
        isMenu: true,
        protected_route: true,
        min_role: 'member'
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        element: <Dashboard />,
        isMenu: true,
        protected_route: true,
        min_role: 'member'
    },
    {
        path: '*',
        name: "404",
        element: <div>Page not found!</div>,
        isMenu: false,
        protected_route: false
    }
]