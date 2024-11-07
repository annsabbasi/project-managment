import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RouteNames } from "../Constants/route";

export default function ProtectedRoute() {
    const navigate = useNavigate();
<<<<<<< HEAD
    const [isAuthenticated, setIsAuthenticated] = useState(false);
=======

    const [isAuthenticated] = useState(false);

    // console.log("THis is Authenticated State:", isAuthenticated)
>>>>>>> ba3d944966c755d77ef3a98e609f1f4df6a1c8a4

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
