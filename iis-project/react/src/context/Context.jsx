import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  notification: null,
  setNotification: () => {}
})

export const ContextProvider = ({children}) => {
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');

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
      token, setToken,
      notification, setNotification
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);