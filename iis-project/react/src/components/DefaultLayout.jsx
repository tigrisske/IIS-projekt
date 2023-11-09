import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import { useStateContext } from './Context';
import { Navigate } from 'react-router-dom';

export default function DefaultLayout(){

    const {user} = useStateContext();

//   if (!user) {
//     return <Navigate to="/login"/>
//   }

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
