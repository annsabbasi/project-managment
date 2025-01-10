import { ROLES } from '../config/roles.js';
import { apiResponse } from '../utils/apiResponse';

const rolesAuthorization = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role === requiredRole || req.user.role === ROLES.SUPERADMIN) {
            next();
        } else {
            res.status(200).json(new apiResponse(200, "Task created successfully."))
        }
    }
}

export { rolesAuthorization }