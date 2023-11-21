import { Link, Route, Routes } from "react-router-dom";
import { nav } from "./navigation";
import { useStateContext } from "../Context";

export const RenderRoutes = () => {
    const {compareRoles} = useStateContext();

    const { user } = useStateContext();

    return (
        <Routes>
            {nav.map((route, index) => {
                const { path, element, protected_route, min_role } = route;
                const canAccess =
                    !protected_route ||
                    (user.isAuthenticated && compareRoles(user.role, min_role) === true);

                return canAccess && <Route key={index} path={path} element={element} />;
            })}
        </Routes>
    )
}

const MenuItem = ({ route }) => (
    <div className="menu-item">
        <Link to={route.path}>{route.name}</Link>
    </div>
);

export const RenderMenu = () => {
    const { user, logout, compareRoles } = useStateContext();

    return (
        <header>
            <nav>
                {nav
                    .filter((route) => {
                        const { protected_route, min_role } = route;
                        const canAccess =
                            !protected_route ||
                            (user.isAuthenticated && compareRoles(user.role, min_role) === true);
                        return canAccess && route.isMenu;
                    })
                    .map((route, index) => (
                        <MenuItem key={index} route={route} />
                    ))}

                {user.isAuthenticated ? (
                    <div className="menu-item">
                        <Link to="#" onClick={logout}>
                            Log out
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="menu-item">
                            <Link to="login">Log in</Link>
                        </div>
                        <div className="menu-item">
                            <Link to="signup">Sign Up</Link>
                        </div>
                    </div>
                )}
            </nav>

        </header>
    );
};

export default RenderMenu;
