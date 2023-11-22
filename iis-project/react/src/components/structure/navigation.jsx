import { Dashboard } from "../../view/Dashboard"
import { Home } from "../../view/Home"
import { Login } from "../../view/Login"
import { Events } from '../../view/Events'
import UserDetail from "../../view/User"
import UsersBoard from "../UsersBoard"
import UpcomingCalendar from "../UpcomingCalendar"
import { CreateEvent } from "../../view/CreateEvent"
import { CreateLocation } from "../../view/CreateLocation"
import { CreateCategory } from "../../view/CreateCategory"
import { SignUp } from "../../view/SignUp"
import { MyEvents } from "../../view/MyEvents"
import { Event } from "../../view/Event"
import { Navigate } from "react-router-dom"
import { Categories } from "../../view/Categories"
import { Locations } from "../../view/Locations"
import { LocationDetail } from "../Location"


export const nav = [
    {
        path: "/",
        name: "Home",
        element: <Navigate to="/events" />,
        isMenu: false,
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
        path: "/calendar",
        name: "UpcomingCalendar",
        element: <UpcomingCalendar />,
        isMenu: true,
        protected_route: true,
        min_role: 'member'
    },
    {
        path: "/events",
        name: "Events",
        element: <Events />,
        isMenu: true,
        protected_route: false
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
        path: "/event/:eventId",
        name: "Event",
        element: <Event />,
        isMenu: false,
        protected_route: false
    },
    {
        path: "/calendar",
        name: "My Calendar",
        element: <UpcomingCalendar />,
        isMenu: true,
        protected_route: true,
        min_role: 'member'
    },
    {
        path: "/categories",
        name: "Categories",
        element: <Categories />,
        isMenu: true,
        protected_route: true,
        min_role: 'moderator'
    },
    {
        path: "/locations",
        name: "Locations",
        element: <Locations />,
        isMenu: true,
        protected_route: true,
        min_role: 'moderator'
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
        path: "/user/:userId",
        name: "UserDetail",
        element: <UserDetail />,
        isMenu: false,
        protected_route: true,
        min_role: 'admin'
    },
    {
        path: "/createevent",
        name: "Create Event",
        element: <CreateEvent />,
        isMenu: false,
        min_role: 'member',
        protected_route: true
    },
    {
        path: "/createlocation",
        name: "Create Location",
        element: <CreateLocation />,
        isMenu: false,
        min_role: 'member',
        protected_route: true
    },
    {
        path: "/createcategory",
        name: "Create Category",
        element: <CreateCategory />,
        isMenu: false,
        min_role: 'member',
        protected_route: true
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        element: <Dashboard />,
        isMenu: true,
        protected_route: true,
        min_role: 'moderator'
    },
    {
        path: '*',
        name: "404",
        element: <div>Page not found!</div>,
        isMenu: false,
        protected_route: false
    }
]