import { lazy } from "react";
import { RouteNames } from "../Constants/route";


const Project = lazy(() => import('../Pages/Dashboard/Project'));
const Client = lazy(() => import('../Pages/Dashboard/Client'));
const Message = lazy(() => import('../Pages/Dashboard/Message'));
const Home = lazy(() => import('../Pages/Home'));
const Layout = lazy(() => import('../Layout'));


export const PublicRoute = [
    { path: RouteNames.PROJECT, element: Project },
    { path: RouteNames.CLIENT, element: Client },
    { path: RouteNames.MESSAGE, element: Message },
    { path: RouteNames.HOME, element: Home },
    { path: RouteNames.LAYOUT, element: Layout },
]
export const PrivateRoute = [
    { path: RouteNames.PROJECT, element: Project, layout: true, title: 'Project' },
    { path: RouteNames.CLIENT, element: Client, layout: true, title: 'Client' },
    { path: RouteNames.MESSAGE, element: Message, layout: true, title: 'Message' },
]