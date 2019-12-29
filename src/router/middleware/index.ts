import authMiddleware from './user/auth';
import guestMiddleware from './user/guest';
import hasAccountMiddleware from './user/has-account';
import superAdminMiddleware from './user/super-admin';

export const auth = authMiddleware;
export const guest = guestMiddleware;
export const hasAccount = hasAccountMiddleware;
export const superAdmin = superAdminMiddleware;

export default [auth, guest, hasAccount, superAdmin];
