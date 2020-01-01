import { Middleware } from '@/types';
import { auth as authMiddleware } from './user/auth';
import { guest as guestMiddleware } from './user/guest';
import { hasAccount as hasAccountMiddleware } from './user/has-account';
import { superAdmin as superAdminMiddleware } from './user/super-admin';

export const auth: Middleware = authMiddleware;
export const guest: Middleware = guestMiddleware;
export const hasAccount: Middleware = hasAccountMiddleware;
export const superAdmin: Middleware = superAdminMiddleware;

export default [auth, guest, hasAccount, superAdmin];
