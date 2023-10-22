import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./view/Dashboard.jsx";

import DefaultLayout from "./components/DefaultLayout";
import Login from "./view/Login.jsx";
import SignUp from "./view/SignUp.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            // {
            //     path: '/',
            //     element: <Dashboard/>
            // },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            }]
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
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