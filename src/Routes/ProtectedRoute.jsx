//     // Have to Show the Frontend to Client So I am currently making the site accessible without login
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RouteNames } from "../Constants/route";
import PropTypes from 'prop-types';


export default function ProtectedRoute({ allowedRoles }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {

        if (isAuthenticated) {
            setIsAuthenticated(true);
        } else {
            navigate(`/${RouteNames.LOGIN}`);
        }
    }, [navigate, allowedRoles]);

    return isAuthenticated ? <Outlet /> : null;
}


ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
};




//     // Have to Show the Frontend to Client So I am currently making the site accessible without login
// import { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import { RouteNames } from "../Constants/route";
// import PropTypes from 'prop-types';


// export default function ProtectedRoute({ allowedRoles }) {
//     const navigate = useNavigate();
//     // const [isAuthenticated, setIsAuthenticated] = useState(false);

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
//     allowedRoles: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.arrayOf(PropTypes.string),
//     ]).isRequired,
// };
