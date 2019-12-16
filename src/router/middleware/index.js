import authMiddleware from './user/auth';
import hasAccountMiddleware from './user/has-account';
import superAdminMiddleware from './user/super-admin';

export const auth = authMiddleware;
export const hasAccount = hasAccountMiddleware;
export const superAdmin = superAdminMiddleware;

export default [auth, hasAccount, superAdmin];
