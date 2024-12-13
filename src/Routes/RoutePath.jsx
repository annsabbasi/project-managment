import { lazy } from "react";
import { RouteNames } from "../Constants/route";


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
const AddProjects = lazy(() => import('../Pages/Dashboard/AddProjects'))
const LoginPage = lazy(() => import('../Pages/Login'))
const SignUpPage = lazy(() => import('../Pages/Signup'))
const Checkout = lazy(() => import('../Pages/Dashboard/CheckoutPage'))



// Super Admin Route Part
const AdminLayout = lazy(() => import('../AdminWork'));
const AdminPage1 = lazy(() => import('../AdminWork/pages/Page1'));
const AdminPage2 = lazy(() => import('../AdminWork/pages/Page2'));
const AdminPage3 = lazy(() => import('../AdminWork/pages/Page3'));
const Basic = lazy(() => import('../AdminWork/pages/planRequest/basic'));
const Standard = lazy(() => import('../AdminWork/pages/planRequest/standard'));
const Premium = lazy(() => import('../AdminWork/pages/planRequest/premium'));
const Request = lazy(() => import('../AdminWork/pages/planRequest/request'));
const PlanRequest = lazy(() => import('../AdminWork/pages/planRequest'));



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



export const PublicRoute = [
    { path: RouteNames.HOME, element: Home },
    // { path: '/', element: Home },
    { path: RouteNames.LAYOUT, element: Layout },
    { path: RouteNames.LOGIN, element: LoginPage },
    { path: RouteNames.SIGNUP, element: SignUpPage },
    // { path: '*', element: NotFound }
]



export const PrivateRoute = [
    { path: RouteNames.DASHBOARD, element: Dashboard, layout: true, title: 'Dashboard' },
    { path: RouteNames.MESSAGE, element: Message, layout: true, title: 'Message' },
    { path: RouteNames.CLIENT, element: Client, layout: true, title: 'Client' },
    { path: RouteNames.TEAMS, element: Teams, layout: true, title: 'Teams' },
    { path: RouteNames.MEETINGS, element: Meetings, layout: true, title: 'Meetings' },
    { path: RouteNames.SERVICES, element: Services, layout: true, title: 'Services' },
    { path: RouteNames.CONTRACTS, element: Contracts, layout: true, title: 'Contracts' },
    { path: RouteNames.INVOICES, element: Invoices, layout: true, title: 'Invoices' },
    { path: RouteNames.FORMS, element: Forms, layout: true, title: 'Forms' },
    { path: RouteNames.FINANCES, element: Finances, layout: true, title: 'Finances' },
    // The AddProjects is the children and present inside this Route
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