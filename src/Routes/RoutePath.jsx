import { lazy } from "react";
import { RouteNames } from "../Constants/route";

// const Dashboard = import {'../Pages/Dashboard/Dashboard'}
import Dashboard from '../Pages/Dashboard/Dashboard'
const Project = lazy(() => import('../Pages/Dashboard/Project'));
const Message = lazy(() => import('../Pages/Dashboard/Message'));
const Client = lazy(() => import('../Pages/Dashboard/Client'));
const Teams = lazy(() => import('../Pages/Dashboard/Teams'));
const Meetings = lazy(() => import('../Pages/Dashboard/Meetings'));
const Referrals = lazy(() => import('../Pages/Dashboard/Referrals'));
const Services = lazy(() => import('../Pages/Dashboard/Services'));
const Contracts = lazy(() => import('../Pages/Dashboard/Contracts'));
const Invoices = lazy(() => import('../Pages/Dashboard/Invoices'));
const Forms = lazy(() => import('../Pages/Dashboard/Forms'));
const Finances = lazy(() => import('../Pages/Dashboard/Finances'));
const Home = lazy(() => import('../Pages/Home'));
const Layout = lazy(() => import('../Layout'));


export const PublicRoute = [
    // { path: RouteNames.PROJECT, element: Project },
    // { path: RouteNames.CLIENT, element: Client },
    // { path: RouteNames.MESSAGE, element: Message },
    { path: RouteNames.HOME, element: Home },
    { path: RouteNames.LAYOUT, element: Layout },
]
export const PrivateRoute = [
    { path: RouteNames.DASHBOARD, element: Dashboard, layout: true, title: 'Dashboard' },
    { path: RouteNames.PROJECT, element: Project, layout: true, title: 'Project' },
    { path: RouteNames.MESSAGE, element: Message, layout: true, title: 'Message' },
    { path: RouteNames.CLIENT, element: Client, layout: true, title: 'Client' },
    { path: RouteNames.TEAMS, element: Teams, layout: true, title: 'Teams' },
    { path: RouteNames.MEETINGS, element: Meetings, layout: true, title: 'Meetings' },
    { path: RouteNames.REFERRALS, element: Referrals, layout: true, title: 'Referrals' },
    { path: RouteNames.SERVICES, element: Services, layout: true, title: 'Services' },
    { path: RouteNames.CONTRACTS, element: Contracts, layout: true, title: 'Contracts' },
    { path: RouteNames.INVOICES, element: Invoices, layout: true, title: 'Invoices' },
    { path: RouteNames.FORMS, element: Forms, layout: true, title: 'Forms' },
    { path: RouteNames.FINANCES, element: Finances, layout: true, title: 'Finances' },
]