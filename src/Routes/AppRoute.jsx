import Header from "../Components/Header"
import Spinner from "../Components/Spinner"

import ProtectedRoute from "./ProtectedRoute"
import RedirectRoute from "./RedirectRoute"

import Layout from "../Layout"
import AdminLayout from "../AdminWork"
import { AdminRoute, PrivateRoute, PublicRoute } from "./RoutePath"

import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"



const renderRoutes = (routes) => {
    return (
        <>
            {routes.map(({ path, element: Element, params, title, layout, adminLayout, children, index }) => (
                <Route
                    key={`${path}${index}`}
                    path={`${path}${params ?? ''}`}
                    element={
                        <Suspense fallback={<Spinner />}>
                            {layout ?
                                (
                                    <Layout title={title}>
                                        <Element />
                                    </Layout>
                                ) :
                                adminLayout ? (
                                    <AdminLayout title={title}>
                                        <Element />
                                    </AdminLayout>
                                ) :
                                    (
                                        <>
                                            <Header />
                                            <Element />
                                        </>
                                    )}
                        </Suspense>
                    }>

                    {children && children.map(({ path: childPath, element: ChildElement }) => (
                        <Route key={childPath} path={childPath} element={<ChildElement />} />
                    ))}

                </Route>
            ))}
        </>
    )
}



export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<RedirectRoute />} />

            {/* Superadmin routes with AdminLayout */}
            <Route element={<ProtectedRoute allowedRoles={'superadmin'} layout={AdminLayout} />}>
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
