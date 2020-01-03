import { Location, NavigationGuard, Route } from 'vue-router';
import { User as FirebaseUser } from 'firebase';

// Router
export interface Context {
	to: Route;
	from: Route;
	// TODO: Update `next` when this PR from vue-router will be merged => https://github.com/vuejs/vue-router/pull/2497
	next: Parameters<NavigationGuard>[2];
	store: any;
}
export type Middleware = (context: Context, nextPipeline: MiddlewarePipeline) => Route | MiddlewarePipeline;
export type MiddlewarePipeline = (context: Context, middleware: Middleware[], index: number) => Middleware | any;

// State
export interface RootState {} // TODO: Define RootState
export interface UserState {
	user: User | null;
	isAuthenticated: boolean;
}

// User
type RoleCode = 0 | 1 | 2 | 3 | 4 | 5;
export interface Role {
	roleName: string;
	roleCode: RoleCode;
}
export interface User extends FirebaseUser {
	accounts: string[];
	studioRoles: RoleCode;
}

// Vue App
export interface Link {
	icon: string;
	title: string;
	link: Location;
	displayRule?(): boolean;
}
