import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./view/Dashboard.jsx";

import DefaultLayout from "./layouts/DefaultLayout.jsx";
import Login from "./view/Login.jsx";
import SignUp from "./view/SignUp.jsx";

const router = createBrowserRouter([
    { path: '/', element: <DefaultLayout />, children: [
        { path: '/', element: <Dashboard /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <SignUp /> },
    ]},
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            { path: '/dashboard', element: <Dashboard /> },
        ]
    },
    {
        path: '/login',
        element: <Login />,
        children: [
            { path: '/login', element: <Login /> },
        ]
    },
    {
        path: '/signup',
        element: <SignUp />,
        children: [
            { path: '/signup', element: <SignUp /> },
        ]
    },
]);

export default router;