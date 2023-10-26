import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import { useStateContext } from './Context';
import { Navigate } from 'react-router-dom';

export default function DefaultLayout(){

    const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

    return (
        <div>
            <header>
                <Header/>
            </header>   
            <aside>
                <Outlet/>
            </aside>
        </div>
    )
} 
