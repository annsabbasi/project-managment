// import { Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Layout from "../Layout";
// import Header from "../Components/Header"
// import AdminLayout from "../adminLayout"; // Import the AdminLayout
// import RedirectRoute from "./RedirectRoute";
// import ProtectedRoute from "./ProtectedRoute";
// import { PrivateRoute, PublicRoute, adminRoute } from "./RoutePath";
// import Spinner from "../Components/Spinner";

// const renderRoute = (routes) => {
//     return (
//         <>
//             {routes.map(({ path, element: Element, params, title, layout, children, index }) => (
//                 <Route
//                     key={`${path}${index}`}
//                     path={`${path}${params ?? ''}`}
//                     element={
//                         <Suspense fallback={<Spinner />}>
//                             {layout ? (
//                                 <layout title={title}>
//                                     <Element />
//                                 </layout>
//                             ) : (
//                                 <>
//                                     <Header />
//                                     <Element />
//                                 </>
//                             )}
//                         </Suspense>
//                     }
//                 >
//                     {children && children.map(({ path: childPath, element: ChildElement }) => (
//                         <Route key={childPath} path={childPath} element={<ChildElement />} />
//                     ))}
//                 </Route>
//             ))}
//         </>
//     );
// };

// export const AppRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<RedirectRoute />} />

//             {/* Protected routes for superadmin with AdminLayout */}
//             <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
//                 {renderRoute(adminRoute, AdminLayout)}
//             </Route>

//             {/* Protected routes for admin and other users with Layout */}
//             <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
//                 {renderRoute(PrivateRoute, Layout)}
//             </Route>

//             {/* Public routes */}
//             {renderRoute(PublicRoute)}
//         </Routes>
//     );
// };



import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Header from "../Components/Header";
import RedirectRoute from "./RedirectRoute";
import ProtectedRoute from "./ProtectedRoute";
import { AdminRoute, PrivateRoute, PublicRoute } from "./RoutePath";
import Spinner from "../Components/Spinner";
import AdminLayout from "../AdminWork";

const renderRoutes = (routes, LayoutComponent) => {
    return (
        <>
            {routes.map(({ path, element: Element, adminLayout, title, layout, children, index }) => (
                <Route
                    key={`${path}${index}`}
                    path={path}
                    element={
                        <Suspense fallback={<Spinner />}>
                            {layout && adminLayout ? (
                                <LayoutComponent title={title}>
                                    <Element />
                                </LayoutComponent>
                            ) : (
                                <>
                                    {/* <Header /> */}
                                    <Element />
                                </>
                            )}
                        </Suspense>
                    }
                >
                    {children &&
                        children.map(({ path: childPath, element: ChildElement }) => (
                            <Route key={childPath} path={childPath} element={<ChildElement />} />
                        ))}
                </Route>
            ))}
        </>
    );
};

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<RedirectRoute />} />

            {/* Superadmin routes with AdminLayout */}
            <Route element={<ProtectedRoute allowedRoles={['superadmin']} layout={AdminLayout} />}>
                {renderRoutes(AdminRoute, AdminLayout)}
            </Route>

            {/* Admin and user routes with Layout */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} layout={Layout} />}>
                {renderRoutes(PrivateRoute, Layout)}
            </Route>

            {/* Public routes */}
            {renderRoutes(PublicRoute)}
        </Routes>
    );
};




// THIS IS ALL WORKING BUT THE ISSUE IS THAT IT SHOWING THE ADMINROUTE INSIDE THE LAYOUT AS A CHILDREN
// import { Suspense } from "react"
// import { Route, Routes } from "react-router-dom"
// import Layout from "../Layout"
// import Header from "../Components/Header"
// import RedirectRoute from "./RedirectRoute"
// import ProtectedRoute from "./ProtectedRoute"
// import { AdminRoute, PrivateRoute, PublicRoute } from "./RoutePath"
// import Spinner from "../Components/Spinner"
// // import AdminLayout from "../AdminLayout"
// import AdminLayout from "../AdminWork"

// const renderRoute = (routes) => {
//     return (
//         <>
//             {routes.map(({ path, element: Element, params, title, layout, children, index }) => (
//                 <Route
//                     key={`${path}${index}`}
//                     path={`${path}${params ?? ''}`}
//                     element={
//                         <Suspense fallback={<Spinner />}>
//                             {layout ? (
//                                 <Layout title={title}>
//                                     <Element />
//                                 </Layout>
//                             ) : (
//                                 <>
//                                     <Header />
//                                     <Element />
//                                 </>
//                             )}
//                         </Suspense>
//                     }>

//                     {children && children.map(({ path: childPath, element: ChildElement }) => (
//                         <Route key={childPath} path={childPath} element={<ChildElement />} />
//                     ))}

//                 </Route>
//             ))}
//         </>
//     )
// }
// const renderAdminRoute = (routes) => {
//     return (
//         <>
//             {routes.map(({ path, element: Element, params, title, adminLayout, children, index }) => (
//                 <Route
//                     key={`${path}${index}`}
//                     path={`${path}${params ?? ''}`}
//                     element={
//                         <Suspense fallback={<Spinner />}>
//                             {adminLayout ? (
//                                 <AdminLayout title={title}>
//                                     <Element />
//                                 </AdminLayout>
//                             ) : (
//                                 <>
//                                     <Header />
//                                     <Element />
//                                 </>
//                             )}
//                         </Suspense>
//                     }>

//                     {children && children.map(({ path: childPath, element: ChildElement }) => (
//                         <Route key={childPath} path={childPath} element={<ChildElement />} />
//                     ))}

//                 </Route>
//             ))}
//         </>
//     )
// }

// export const AppRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<RedirectRoute />} />

//             {/* Protected routes for superadmin with AdminLayout */}
//             <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
//                 {/* {renderRoute(adminRoute, AdminLayout)} */}
//                 {renderAdminRoute(AdminRoute, AdminLayout)}
//             </Route>

//             {/* Protected routes for admin and other users with Layout */}
//             <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
//                 {renderRoute(PrivateRoute, Layout)}
//             </Route>

//             {/* Public routes */}
//             {renderRoute(PublicRoute)}
//         </Routes>


//         // <Routes>
//         //     <Route path='/' element={<RedirectRoute />} />
//         //     <Route element={<ProtectedRoute />} >{renderRoute(PrivateRoute)}</Route>
//         //     {renderRoute(PublicRoute)}
//         // </Routes>
//     )
// }