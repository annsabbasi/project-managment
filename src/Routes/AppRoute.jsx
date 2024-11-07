import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../Layout"
import Header from "../Components/Header"
import RedirectRoute from "./RedirectRoute"
import ProtectedRoute from "./ProtectedRoute"
import { PrivateRoute, PublicRoute } from "./RoutePath"
import Spinner from "../Components/Spinner"

const renderRoute = (routes) => {
    return (
        <>
            {routes.map(({ path, element: Element, params, title, layout, children, index }) => (
                <Route
                    key={`${path}${index}`}
                    path={`${path}${params ?? ''}`}
                    element={
                        <Suspense fallback={<Spinner />}>
                            {layout ? (
                                <Layout title={title}>
                                    <Element />
                                </Layout>
                            ) : (
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
            <Route path='/' element={<RedirectRoute />} />
            <Route element={<ProtectedRoute />} >{renderRoute(PrivateRoute)}</Route>
            {renderRoute(PublicRoute)}
        </Routes>
    )
}