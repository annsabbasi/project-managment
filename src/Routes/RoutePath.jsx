/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteNames } from "../Constants/route";

import Dashboard from '../Pages/Dashboard/Dashboard'
const Layout = lazy(() => import('../Layout'));
const Home = lazy(() => import('../Pages/Home'));
const LoginPage = lazy(() => import('../Pages/Login'));
const SignUpPage = lazy(() => import('../Pages/Signup'));
const Forms = lazy(() => import('../Pages/Dashboard/Forms'));
const Teams = lazy(() => import('../Pages/Dashboard/Teams'));
const Client = lazy(() => import('../Pages/Dashboard/Client'));
const Message = lazy(() => import('../Pages/Dashboard/Message'));
const Project = lazy(() => import('../Pages/Dashboard/Project'));
const Services = lazy(() => import('../Pages/Dashboard/Services'));
const Invoices = lazy(() => import('../Pages/Dashboard/Invoices'));
const Finances = lazy(() => import('../Pages/Dashboard/Finances'));
const Meetings = lazy(() => import('../Pages/Dashboard/Meetings'));
const Referrals = lazy(() => import('../Pages/Dashboard/Referrals'));
const Contracts = lazy(() => import('../Pages/Dashboard/Contracts'));
const Checkout = lazy(() => import('../Pages/Dashboard/CheckoutPage'));
const AddProjects = lazy(() => import('../Pages/Dashboard/AddProjects'));
const SingleVideo = lazy(() => import('../Pages/Dashboard/AddVideos/SingleVideo'));
// import SingleVideo from "../Pages/Dashboard/AddVideos/SingleVideo";

// Super Admin Route Part
const AdminLayout = lazy(() => import('../AdminWork'));
const AdminPage1 = lazy(() => import('../AdminWork/pages/Page1'));
const AdminPage2 = lazy(() => import('../AdminWork/pages/Page2'));
const AdminPage3 = lazy(() => import('../AdminWork/pages/Page3'));
const PlanRequest = lazy(() => import('../AdminWork/pages/planRequest'));
const Basic = lazy(() => import('../AdminWork/pages/planRequest/basic'));
const Request = lazy(() => import('../AdminWork/pages/planRequest/request'));
const Premium = lazy(() => import('../AdminWork/pages/planRequest/premium'));
const Standard = lazy(() => import('../AdminWork/pages/planRequest/standard'));



// ------------ Admin Routes which are Protected ------------
export const AdminRoute = [
    { path: RouteNames.ADMINLAYOUT, element: AdminLayout, adminLayout: true, title: 'Admin Layout' },
    { path: RouteNames.ADMINPAGE1, element: AdminPage1, adminLayout: true, title: 'AdminPage1' },
    { path: RouteNames.ADMINPAGE2, element: AdminPage2, adminLayout: true, title: 'AdminPage2' },
    { path: RouteNames.ADMINPAGE3, element: AdminPage3, adminLayout: true, title: 'AdminPage3' },
    { path: RouteNames.BASIC, element: Basic, adminLayout: true, title: 'Basic' },
    { path: RouteNames.STANDARD, element: Standard, adminLayout: true, title: 'Standard' },
    { path: RouteNames.PREMIUM, element: Premium, adminLayout: true, title: 'Premium' },
    { path: RouteNames.REQUEST, element: Request, adminLayout: true, title: 'Request' },
    { path: RouteNames.PLANREQUEST, element: PlanRequest, adminLayout: true, title: 'Plan Request' },
    // other admin routes
];



// ------------ Public Routes which are not Protected ------------
export const PublicRoute = [
    { path: RouteNames.HOME, element: Home },
    // { path: '/', element: Home },
    { path: RouteNames.LAYOUT, element: Layout },
    { path: RouteNames.LOGIN, element: LoginPage },
    { path: RouteNames.SIGNUP, element: SignUpPage },
    // { path: '*', element: NotFound }
]



// ------------ Private Routes which are Protected ------------
export const PrivateRoute = [
    { path: RouteNames.DASHBOARD, element: Dashboard, layout: true, title: 'Dashboard' },
    { path: RouteNames.MESSAGE, element: Message, layout: true, title: 'Message' },
    { path: RouteNames.TEAMS, element: Teams, layout: true, title: 'Teams' },
    { path: RouteNames.MEETINGS, element: Meetings, layout: true, title: 'Meetings' },
    { path: RouteNames.SERVICES, element: Services, layout: true, title: 'Services' },
    { path: RouteNames.CONTRACTS, element: Contracts, layout: true, title: 'Contracts' },
    { path: RouteNames.INVOICES, element: Invoices, layout: true, title: 'Invoices' },
    { path: RouteNames.FORMS, element: Forms, layout: true, title: 'Forms' },
    { path: RouteNames.FINANCES, element: Finances, layout: true, title: 'Finances' },
    // { path: RouteNames.SINGLEVIDEO, element: SingleVideo, layout: true, title: 'SingleVideo' },
    // The AddProjects is the children and present inside this Route
    {
        path: RouteNames.CLIENT,
        element: Client,
        layout: true,
        title: 'Client',
        children: [
            { path: `${RouteNames.SINGLEVIDEO}/:id`, element: SingleVideo, layout: true, title: 'Clientt' }
        ]
    },
    {
        path: RouteNames.PROJECT,
        element: Project,
        layout: true,
        title: 'Project',
        children: [
            { path: `${RouteNames.ADDPRODUCTS}/:id`, element: AddProjects, layout: true, title: 'AddProjects' }
        ]
    },
    {
        path: RouteNames.REFERRALS,
        element: Referrals,
        layout: true,
        title: 'Referrals',
        children: [
            { path: `${RouteNames.CHECKOUT}`, element: Checkout, layout: true, title: 'Checkout', }
        ]
    },
    // { path: RouteNames.REFERRALS, element: Referrals, layout: true, title: 'Referrals' },
]