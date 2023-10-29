import { Link, Outlet } from 'react-router-dom';

export default function DefaultLayout({ children }){
    return (
        <div>
            <div className="navbar">
                <Link to="/">Home</Link>
                <br/>
                <Link to="/dashboard">Dashboard </Link>
            </div>
            {children}
            <div className="footer">
                <p>Footer</p>
            </div>
        </div>
    )
} 
