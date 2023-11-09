import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => { },
    setToken: () => { },
    setNotification: () => { }
})

export const ContextProvider = ({ children }) => {
    const [user, _setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('USER');
        if (storedUser) {
            // Parse the stored user data from a JSON string
            setUser(JSON.parse(storedUser));
        }
    }, []); // Empty array ensures that effect is only run on mount


    // Define the setUser function to update user state and localStorage
    const setUser = (userData) => {
        _setUser(userData);
        if (userData) {
            // Save user data to localStorage as a JSON string
            localStorage.setItem('USER', JSON.stringify(userData));
        } else {
            // Clear the user data from localStorage
            localStorage.removeItem('USER');
        }
    };

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
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
            token,
            setToken,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);