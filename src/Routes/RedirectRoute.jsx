import { RouteNames } from '../Constants/route';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RedirectRoute() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/${RouteNames.HOME}`)
    }, [navigate])
    return null;
}
