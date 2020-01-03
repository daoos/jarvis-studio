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
export interface RootState {
	user: UserState;
} // TODO: Define RootState

export interface UserState {
	user: User | null;
	isAuthenticated: boolean;
}

export type DateLabel = 'Today' | 'Last 2 Days' | 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days';
export type NbDays = 0 | 1 | 7 | 31 | 90;
export interface DateFilter {
	dateLabel: DateLabel;
	nbDays: NbDays;
}
export type EnvLabel = 'All Env.' | 'Production' | 'Pre-Production' | 'Staging' | 'Development';
export type EnvId = 'ALL' | 'PROD' | 'PREPROD' | 'STAGING' | 'DEV';
export interface EnvFilter {
	envLabel: EnvLabel;
	envId: EnvId;
}
export type RunStatusLabel = 'All Status' | 'Success' | 'Failed' | 'Running';
export type RunStatusId = 'ALL' | 'SUCCESS' | 'FAILED' | 'RUNNING';
export interface RunStatusFilter {
	runStatusLabel: RunStatusLabel;
	runStatusId: RunStatusId;
}
export interface Account {
	account_name: 'All Accounts' | 'Jules' | 'Pimkie' | 'Grain de Malice' | 'Orsay' | 'RougeGorge' | 'jarvis-demo';
	id: '000000' | '000010' | '000020' | '000040' | '000050' | '000060' | '000099';
}
export interface FilterState {
	dateFilterSelected: DateFilter;
	dateFilters: DateFilter[];
	envFilterSelected: EnvFilter;
	envFilters: EnvFilter[];
	runStatusFilterSelected: RunStatusFilter;
	runStatusFilters: RunStatusFilter[];
	minDateFilter: string;
	accountFilterSelected: Account;
	filteredAccounts: Account[];
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
