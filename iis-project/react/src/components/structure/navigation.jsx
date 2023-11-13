import { Dashboard } from "../../view/Dashboard"
import { Home } from "../../view/Home"
import { Login } from "../../view/Login"
import { Events } from '../../view/Events'
import { CreateEvent } from "../../view/CreateEvent"
import { SignUp } from "../../view/SignUp"

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
        path: "/signup",
        name: "Sign Up",
        element: <SignUp />,
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
        path: "/createevent",
        name: "Create Event",
        element: <CreateEvent />,
        isMenu: true,
        protected_route: true
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