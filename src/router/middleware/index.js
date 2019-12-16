import authMiddleware from './user/auth';
import superAdminMiddleware from './user/super-admin';

export const auth = authMiddleware;
export const superAdmin = superAdminMiddleware;

export default [auth, superAdmin];
