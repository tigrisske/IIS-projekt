import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import { useStateContext } from './Context';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import  axiosClient  from '../axios-client';

export default function DefaultLayout(){

//     const {user, token, setUser, setToken, notification} = useStateContext();

//   if (!token) {
//     return <Navigate to="/login"/>
//   }


const navigate = useNavigate();

function check(){
    axiosClient.post('/auth', { withCredentials: true })
    .then(  (response) => {console.log(response);  })
    .catch(error => {console.log(error);
    console.log("error"); navigate('/login');
    });
}

// check();

    return (
        <div className='main'>
            <header>
                <Header/>
            </header>   
            <aside className='app-body'>
                <Outlet/>
            </aside>
        </div>
    )
} 