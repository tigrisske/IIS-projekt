import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./view/Dashboard.jsx";

import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Login from "./view/Login.jsx";
import SignUp from "./view/SignUp.jsx";
import User from "./view/User.jsx";
import CreateEvent from "./view/CreateEvent.jsx";
import CreateLocation from "./view/createLocation.jsx";
import CreateCategory from "./view/createCategory.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
           
            {
                path: '/user',
                element: <User/>
            },
            {
                path: '/createevent',
                element: <CreateEvent/>
            },
            {
                path: '/createlocation',
                element: <CreateLocation/>
            },
            {
                path: '/createcategory',
                element: <CreateCategory/>
            },
            ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            }

        ]
    }
    ]
)
//     },
//     {
//         path: '/',
//         element: <GuestLayout/>,
//         children: [
//             {
//                 path: '/',
//                 element: <Dashboard/>
//             },
//             {
//                 path: '/login',
//                 element: <Login/>
//             },
//             {
//                 path: '/register',
//                 element: <Register/>
//             }
//         ]
//     }
// ])
//         children: [
//             {
//                 path: '/',
//                 element: <Navigate to="/users"/>
//             },
//             {
//                 path: '/dashboard',
//                 element: <Dashboard/>
//             },
//             {
//                 path: '/users',
//                 element: <Users/>
//             }
//         ]
//     },
//     {
//         path: '/',
//         element: <GuestLayout/>,
//         children: [
//             {
//                 path: '/login',
//                 element: <Login/>
//             },
//             {
//                 path: '/signup',
//                 element: <Signup/>
//             }
//         ]
//     },
//    {
//     path: '*',
//     element: <NotFound/>
//    }
// ])

export default router;