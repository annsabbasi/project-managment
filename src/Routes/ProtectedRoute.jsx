import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RouteNames } from "../Constants/route";
import PropTypes from "prop-types";

export default function ProtectedRoute({ allowedRoles }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null to prevent flickering

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");  // Normal users
        // const accessTokenC = localStorage.getItem("accessTokenC"); // Admin users
        const userRole = localStorage.getItem("role");

        // Ensure allowedRoles is always an array
        const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

        // Determine which token to validate (admin gets priority)
        // const validToken = accessTokenC || accessToken;
        const validToken = accessToken;

        if (validToken && userRole && rolesArray.includes(userRole)) {
            setIsAuthenticated(true);
        }
        else {
            setIsAuthenticated(false);
            navigate(`/${RouteNames.LOGIN}`, { replace: true });
        }
    }, [navigate, allowedRoles]);

    if (isAuthenticated === null) return null; // Prevents rendering until auth check is complete

    return isAuthenticated ? <Outlet /> : null;
}

// PropTypes Validation
ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
};
