import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { RouteNames } from "../Constants/route";

export default function ProtectedRoute() {
    const navigate = useNavigate();

    const [isAuthenticated] = useState(false);

    // console.log("THis is Authenticated State:", isAuthenticated)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(`/${RouteNames.LOGIN}`)
            // navigate(`/`)
        }
    }, [navigate, isAuthenticated])

    return <Outlet />
}
