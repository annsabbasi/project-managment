import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {
    const userRole = localStorage.getItem("role");

    //   if (userRole === 'admin' || userRole === 'superadmin') {
        // Allow access if the user is either an admin or superadmin
    if (userRole === 'superadmin') {
        return children;
    }

    // Redirect to the login or another fallback route if not authorized
    return <Navigate to="/" />;
};

export default AdminRoute;

AdminRoute.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}