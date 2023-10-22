import { Link, Outlet } from 'react-router-dom';

export default function DefaultLayout(){


    return (
        <div>
            <aside>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Outlet/>
            </aside>
        </div>
    )
} 
