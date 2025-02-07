import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RouteNames } from "../Constants/route";
import PropTypes from "prop-types";

export default function ProtectedRoute({ allowedRoles }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem("accessToken");
        const companyToken = localStorage.getItem("accessTokenC");
        const role = localStorage.getItem("role");

        const hasValidAccess =
            (role === "user" && allowedRoles.includes(role) && userToken) ||
            (role === "admin" && allowedRoles.includes(role) && companyToken);

        if (hasValidAccess) {
            setIsAuthenticated(true);
        } else {
            navigate(`/${RouteNames.LOGIN}`);
        }
    }, [navigate, allowedRoles]);

    return isAuthenticated ? <Outlet /> : null;
}

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
