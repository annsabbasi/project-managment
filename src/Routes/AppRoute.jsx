import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../Layout"
import Header from "../Components/Header"
// import RedirectRoute from "./RedirectRoute"
import ProtectedRoute from "./ProtectedRoute"
import { PrivateRoute, PublicRoute } from "./RoutePath"
import Spinner from "../Components/Spinner"
import Home from "../Pages/Home"

const renderRoute = (routes) => {
    return (
        <>
            {routes.map(({ path, element: Element, params, title, layout }) => {
                return (
                    <Route
                        key={path}
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
                        }
                    />
                )
            })}
        </>
    )
}

export const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path='/' element={<RedirectRoute />} /> */}
            <Route path='/' element={<Home />} />
            <Route element={<ProtectedRoute />} >{renderRoute(PrivateRoute)}</Route>
            {renderRoute(PublicRoute)}
        </Routes>
    )
}