import { Location, NavigationGuard, Route } from 'vue-router';

export interface Link {
	icon: string;
	title: string;
	link: Location;
	displayRule?(): boolean;
}

export interface Role {
	roleName: string;
	roleCode: 0 | 1 | 2 | 3 | 4 | 5;
}

// TODO: Update when this PR from vue-router will be merged => https://github.com/vuejs/vue-router/pull/2497
type Next = Parameters<NavigationGuard>[2];

export interface Context {
	to: Route;
	from: Route;
	next: Next;
	store: any;
}

export type Middleware = (context: Context, nextPipeline: MiddlewarePipeline) => Route | MiddlewarePipeline;
export type MiddlewarePipeline = (context: Context, middleware: Middleware[], index: number) => Middleware | any;
