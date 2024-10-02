import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
// import { RouteNames } from "../Constants/route";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const [isAuthenticated] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            // navigate(`/${RouteNames.MESSAGE}`)
            navigate(`/`)
        }
    }, [navigate, isAuthenticated])

    return <Outlet />
}
