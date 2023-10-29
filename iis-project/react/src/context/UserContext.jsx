import { createContext, useContext, useState, useEffect } from "react";

const userContext = createContext({
    user: null,
    setUser: () => { },
})

export const UserContextProvider = ({ children }) => {
    const [user, _setUser] = useState(localStorage.getItem('USER'));

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

    return (
        <userContext.Provider value={{
            user, setUser,
        }}>
            {children}
        </userContext.Provider>
    );
}

export const useUserContext = () => useContext(userContext);