import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RouteNames } from "../Constants/route";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            setIsAuthenticated(true);
        } else {
            navigate(`/${RouteNames.LOGIN}`);
        }
    }, [navigate]);

    return isAuthenticated ? <Outlet /> : null;
}








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
