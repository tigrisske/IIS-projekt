import axios from "axios";
// import { setUser } from  
// import { useAuth } from "./context/auth-context";
// import  navigate  from './navigationService';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
// After setting SESSION_ID in local storage
console.log(localStorage.getItem('SESSION_ID'));

const redirectToLogin = () => {
    // Perform a redirect to the login page
    window.location.href = '/login';
  };

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}api`,
    withCredentials: true
    // headers: {
    //     'X-CSRF-TOKEN': csrfToken,
    //     'Content-Type': 'application/json',
    //     // Other headers if needed
    // 
});

export default axiosClient;
// this interceptor will check whether the user authorizes(logged) before
// each the request is sent to the API defined above 

axiosClient.interceptors.request.use((config) => {
    // const sessionId = localStorage.getItem('SESSION_ID');
    // console.log("axios request interceptor debug session id: ", sessionId);
    // if (sessionId) {
        // config.headers.Cookie = `SESSION_ID=${sessionId}`;
    // }
    return config;
})


//this intercptor will return response if the user is authorized
//if the user is not authorized, it will remove the SESSION_ID from the local storage
//which will log out the user 

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem('SESSION_ID');
            // setUser({ ...user, isAuthenticated: false })
            localStorage.removeItem('user')
            redirectToLogin();

        }
        throw error;
    }
);

