/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { RouteNames } from "../Constants/route";

// import Dashboard from "../Pages/Dashboard/";
const Layout = lazy(() => import("../Layout"));
const Home = lazy(() => import("../Pages/Home"));
const LoginPage = lazy(() => import("../Pages/Login"));
const SignUpPage = lazy(() => import("../Pages/Signup"));
const Forms = lazy(() => import("../Pages/Dashboard/Forms"));
const Teams = lazy(() => import("../Pages/Dashboard/Teams"));
const Client = lazy(() => import("../Pages/Dashboard/Client"));
const Message = lazy(() => import("../Pages/Dashboard/Message"));
const Project = lazy(() => import("../Pages/Dashboard/Project"));
const Services = lazy(() => import("../Pages/Dashboard/Services"));
const Invoices = lazy(() => import("../Pages/Dashboard/Invoices"));
const Finances = lazy(() => import("../Pages/Dashboard/Finances"));
const Meetings = lazy(() => import("../Pages/Dashboard/Meetings"));
const Referrals = lazy(() => import("../Pages/Dashboard/Referrals"));
const Contracts = lazy(() => import("../Pages/Dashboard/Contracts"));
const Checkout = lazy(() => import("../Pages/Dashboard/CheckoutPage"));
const AddProjects = lazy(() => import("../Pages/Dashboard/AddProjects"));
const Department = lazy(() => import("../Pages/Dashboard/Department"));
const SingleVideo = lazy(() =>
  import("../Pages/Dashboard/AddVideos/SingleVideo")
);

// import SingleVideo from "../Pages/Dashboard/AddVideos/SingleVideo";

// Super Admin Route Part
const AdminLayout = lazy(() => import("../AdminWork"));
const Users = lazy(() => import("../AdminWork/pages/Users/ShowUsers"));
const Notifications = lazy(() =>
  import("../AdminWork/pages/Notifications/Notification")
);
const Settings = lazy(() =>
  import("../AdminWork/pages/Settings/AdminSettings")
);
const Plans = lazy(() => import("../AdminWork/pages/Plans/ShowPlans"));
const Subscription = lazy(() =>
  import("../AdminWork/pages/Subscriptions/ShowSubscriptions")
);
// const Payment = lazy(() => import("../AdminWork/pages/Payments/Payments"));
const SuperAdminDashboard = lazy(() =>
  import("../AdminWork/pages/Dashboard/Dashboard")
);

// ------------ Admin Routes which are Protected ------------
export const AdminRoute = [
  {
    path: RouteNames.ADMINLAYOUT,
    element: AdminLayout,
    adminLayout: true,
    title: "Admin Layout",
  },
  {
    path: RouteNames.SUPERDASHBOARD,
    element: SuperAdminDashboard,
    adminLayout: true,
    title: "Dashboard",
  },
  {
    path: RouteNames.USERS,
    element: Users,
    adminLayout: true,
    title: "Companies",
  },
  {
    path: RouteNames.NOTIFICATIONS,
    element: Notifications,
    adminLayout: true,
    title: "Notifications",
  },
  {
    path: RouteNames.SETTINGS,
    element: Settings,
    adminLayout: true,
    title: "Settings",
  },
  {
    path: RouteNames.PLANS,
    element: Plans,
    adminLayout: true,
    title: "Plans",
  },
  {
    path: RouteNames.SUBSCRIPTION,
    element: Subscription,
    adminLayout: true,
    title: "Subscriptions",
  },
  // {
  //   path: RouteNames.PAYMENT,
  //   element: Payment,
  //   adminLayout: true,
  //   title: "Payments",
  // },
];

// ------------ Public Routes which are not Protected ------------
export const PublicRoute = [
  { path: RouteNames.HOME, element: Home },
  // { path: '/', element: Home },
  { path: RouteNames.LAYOUT, element: Layout },
  { path: RouteNames.LOGIN, element: LoginPage },
  { path: RouteNames.SIGNUP, element: SignUpPage },
  // { path: '*', element: NotFound }
];

// ------------ Private Routes which are Protected ------------
export const PrivateRoute = [
  {
    path: RouteNames.DASHBOARD,
    element: Department,
    layout: true,
    title: "Departments",
  },
  {
    path: RouteNames.MESSAGE,
    element: Message,
    layout: true,
    title: "Message",
  },
  { path: RouteNames.TEAMS, element: Teams, layout: true, title: "Teams" },
  {
    path: RouteNames.MEETINGS,
    element: Meetings,
    layout: true,
    title: "Meetings",
  },
  {
    path: RouteNames.SERVICES,
    element: Services,
    layout: true,
    title: "Services",
  },
  {
    path: RouteNames.CONTRACTS,
    element: Contracts,
    layout: true,
    title: "Contracts",
  },
  {
    path: RouteNames.INVOICES,
    element: Invoices,
    layout: true,
    title: "Invoices",
  },
  { path: RouteNames.FORMS, element: Forms, layout: true, title: "Forms" },
  {
    path: RouteNames.FINANCES,
    element: Finances,
    layout: true,
    title: "Finances",
  },
  // { path: RouteNames.SINGLEVIDEO, element: SingleVideo, layout: true, title: 'SingleVideo' },
  // The AddProjects is the children and present inside this Route
  {
    path: RouteNames.CLIENT,
    element: Client,
    layout: true,
    title: "Client",
    children: [
      {
        path: `${RouteNames.SINGLEVIDEO}/:id`,
        element: SingleVideo,
        layout: true,
        title: "Clientt",
      },
    ],
  },
  {
    path: RouteNames.PROJECT,
    element: Project,
    layout: true,
    title: "Project",
    children: [
      {
        path: `${RouteNames.ADDPROJECTS}/:id`,
        element: AddProjects,
        layout: true,
        title: "AddProjects",
      },
    ],
  },
  {
    path: RouteNames.REFERRALS,
    element: Referrals,
    layout: true,
    title: "Referrals",
    children: [
      {
        path: `${RouteNames.CHECKOUT}`,
        element: Checkout,
        layout: true,
        title: "Checkout",
      },
    ],
  },
  // { path: RouteNames.REFERRALS, element: Referrals, layout: true, title: 'Referrals' },
];
