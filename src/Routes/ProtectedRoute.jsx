import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RouteNames } from "../Constants/route";
import PropTypes from 'prop-types';

export default function ProtectedRoute({ allowedRoles, layout: LayoutComponent }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const role = localStorage.getItem("role");

        if (accessToken && allowedRoles.includes(role)) {
            setIsAuthenticated(true);
        } 
        else {
            navigate(`/${RouteNames.LOGIN}`);
        }
    }, [navigate, allowedRoles]);

    return isAuthenticated ? (
        LayoutComponent ? <LayoutComponent><Outlet /></LayoutComponent> : <Outlet />
    ) : null;
}

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    layout: PropTypes.elementType,
};



// import { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { RouteNames } from "../Constants/route";
// import PropTypes from 'prop-types';


// export default function ProtectedRoute({ allowedRoles }) {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const accessToken = localStorage.getItem("accessToken");
//         const role = localStorage.getItem("role")

//         if (accessToken && allowedRoles.includes(role)) {
//             setIsAuthenticated(true);
//         } else {
//             navigate(`/${RouteNames.LOGIN}`);
//         }
//     }, [navigate, allowedRoles]);

//     return isAuthenticated ? <Outlet /> : null;
// }

// ProtectedRoute.propTypes = {
//     allowedRoles: PropTypes.string.isRequired,
//     // children: PropTypes.node.isRequired,
// }







// import { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom"
// import { RouteNames } from "../Constants/route";

// export default function ProtectedRoute() {
//     const navigate = useNavigate();
//     const [isAuthenticated] = useState(false);

//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate(`/${RouteNames.LOGIN}`)
//         }
//     }, [navigate, isAuthenticated])

//     return <Outlet />
// }
