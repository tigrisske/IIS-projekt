import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { RenderMenu, RenderRoutes } from "./structure/RenderNavigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StateContext = createContext({
    user: null,
    setUser: () => { },
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({ name: undefined, id: undefined, role: undefined, isAuthenticated: false });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');
    const navigate = useNavigate();

    const setNotification = (message, type = 'info') => {
        toast[type](message, { autoClose: 2000 }); // Use toast function based on the notification type
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            // Parse the stored user data from a JSON string
            setUser(JSON.parse(storedUser));
        }
    }, []); // Empty array ensures that effect is only run on mount


    const login = async (credentials) => {
        axiosClient.post('/login', credentials)
            .then((response) => {
                console.log('Login response');
                console.log(response);
                let data = response.data.user;
                let user = { name: data.first_name + " " + data.last_name, id: data.id, role: data.role, isAuthenticated: true }
                console.log(user);
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/')
                setNotification('Login successful!', 'success');
            }).catch(error => {
                setNotification('Login failed! ' + error.response.data.message, 'error');
            });
    }

    const signup = async (request) => {
        axiosClient.post('/signin', request)
            .then((response) => {
                console.log(response);
                let data = response.data.user;
                let user = { name: data.first_name + " " + data.last_name, role: data.role, isAuthenticated: true }
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/');
                setNotification('Signup successful!', 'success');
            })
            .catch(error => {
                console.log(error);
                setNotification('Signup failed! ' + error.response.data.message, 'error');
            });
    }

    const checkLogin = async () => {
        axiosClient.post('/auth', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    setNotification('You are logged in!', 'success');
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setUser({ ...user, isAuthenticated: false })
                    localStorage.removeItem('user')
                    setNotification('You are not logged in!', 'error');
                } else {
                    setNotification('Error checking login status! ' + error.response.data.message, 'error');
                }

            });
    }

    const logout = async () => {
        axiosClient.post('/logout', { withCredentials: true })
            .then(() => {
                setUser({ ...user, isAuthenticated: false })
                localStorage.removeItem('user')
                navigate('/')
                setNotification('Logout successful!', 'success');
            })
            .catch(error => {
                console.log(error);
            });
    }

    function compareRoles(user_role, min_role) {
        const roleOrder = ['member', 'moderator', 'admin'];
        return roleOrder.indexOf(user_role) >= roleOrder.indexOf(min_role);
    }

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            login,
            signup,
            checkLogin,
            logout,
            compareRoles,
            setNotification,
        }}>
            <RenderMenu />
            <ToastContainer
            className={'toast-position'}
             />
            <main>
                <RenderRoutes />
            </main>
        </StateContext.Provider>
    );
}
export const useStateContext = () => useContext(StateContext);