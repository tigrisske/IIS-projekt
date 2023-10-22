import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import router from './router.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import axios from 'axios'

// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ContextProvider> */}
      <RouterProvider router={router}/>
      {/* <App /> */}
    {/* </ContextProvider> */}
  </React.StrictMode>
)
