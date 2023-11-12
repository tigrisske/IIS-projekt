import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { RenderMenu, RenderRoutes } from "./structure/RenderNavigation";


const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => { },
    setToken: () => { },
    setNotification: () => { }
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({ name: undefined, role: undefined, isAuthenticated: false });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');
    const navigate = useNavigate();

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
                let user = {name: data.first_name + " " + data.last_name, role: data.role, isAuthenticated: true}
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user))
                navigate('/')
            }).catch(error => {
                console.log(error);
            });
    }

    const checkLogin = async () => {
        axiosClient.post('/auth', { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    console.log('User is logged in');
                } else if (response.status === 401) {
                    console.log('User is not logged in');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const logout = async () => {
        axiosClient.post('/logout', { withCredentials: true })
            .then(() => {
                setUser({...user, isAuthenticated: false})
                localStorage.removeItem('user')
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            });
    }

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            // Save user data to localStorage as a JSON string
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            // Clear the user data from localStorage
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            login,
            checkLogin,
            logout,
            token,
            setToken,
            notification,
            setNotification,
        }}>
            <RenderMenu />
            <RenderRoutes />
        </StateContext.Provider>
    );
}
export const useStateContext = () => useContext(StateContext);