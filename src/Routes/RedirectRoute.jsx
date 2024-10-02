import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { RouteNames } from '../Constants/route';

export default function RedirectRoute() {
    const navigate = useNavigate();
    useEffect(() => {
        // navigate(`/${RouteNames.MESSAGE}`)
        navigate(`/`)
    }, [navigate])
    return null;
}
