import { Link, Route, Routes } from "react-router-dom";
import { nav } from "./navigation";
import { useStateContext } from "../Context";

function compareRoles(user_role, min_role) {
    const roleOrder = ['user', 'moderator', 'admin'];
    return roleOrder.indexOf(user_role) >= roleOrder.indexOf(min_role);
}

export const RenderRoutes = () => {

    const { user } = useStateContext();

    return (
        <Routes>
            {nav.map((route, index) => {
                const { path, element, protected_route, min_role } = route;
                const canAccess =
                    !protected_route ||
                    (user.isAuthenticated && compareRoles(user.role, min_role) >= 0);

                return canAccess && <Route key={index} path={path} element={element} />;
            })}
        </Routes>
    )
}

const MenuItem = ({ route }) => (
    <div className="menuItem">
        <Link to={route.path}>{route.name}</Link>
    </div>
);

export const RenderMenu = () => {
    const { user, logout } = useStateContext();

    return (
        <div className="menu">
            {nav
                .filter((route) => {
                    const { protected_route, min_role } = route;
                    const canAccess =
                        !protected_route ||
                        (user.isAuthenticated && compareRoles(user.role, min_role) >= 0);
                    return canAccess && route.isMenu;
                })
                .map((route, index) => (
                    <MenuItem key={index} route={route} />
                ))}

            {user.isAuthenticated ? (
                <div className="menuItem">
                    <Link to="#" onClick={logout}>
                        Log out
                    </Link>
                </div>
            ) : (
                <div className="menuItem">
                    <Link to="login">Log in</Link>
                </div>
            )}
        </div>
    );
};

export default RenderMenu;
