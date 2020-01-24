import { Location, NavigationGuard, Route } from 'vue-router';
import { User as FirebaseUser } from 'firebase';
import { IPluginState } from 'vuex-easy-firestore/types/declarations';

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
	filters: FilterState;
	accounts: IPluginState;
	schemas: IPluginState;
	mirrorExcGcsToGcsRuns: IPluginState;
	mirrorExcGcsToGcsConfs: IPluginState;
	mirrorExcGcsToGbqRuns: IPluginState;
	mirrorExcGcsToGbqConfs: IPluginState;
	mirrorExcGcsToGbqConfDetails: IPluginState;
	gcpCloudFunctions: IPluginState;
	getGbqToGcsRuns: IPluginState;
	getGbqToGcsConfs: IPluginState;
	getGbqToGbqConfs: IPluginState;
	getGbqToGbqRuns: IPluginState;
	vmLauncherConfs: IPluginState;
	vmLauncherRuns: IPluginState;
	workflowConfs: IPluginState;
	workflowStatus: IPluginState;
	dataModels: IPluginState;
	dataTables: IPluginState;
	dataTableDetails: IPluginState;
	storageToStorageConfs: IPluginState;
	storageToStorageRuns: IPluginState;
	storageToTableConf: IPluginState;
	storageToTablesConfs: IPluginState;
	storageToTableRun: IPluginState;
	storageToTablesRuns: IPluginState;
	tablesToTablesRun: IPluginState;
	tableToStorageConfs: IPluginState;
	tableToStorageRuns: IPluginState;
}

export interface UserState {
	user: User | null;
	isAuthenticated: boolean;
}

export type DateLabel = 'Today' | 'Last 2 Days' | 'Last 7 Days' | 'Last 30 Days' | 'Last 90 Days';
export type NbDays = 0 | 1 | 7 | 31 | 90;
export interface DateFilter {
	label: DateLabel;
	value: NbDays;
}
export type EnvLabel = 'All Env.' | 'Production' | 'Pre-Production' | 'Staging' | 'Development';
export type EnvId = 'ALL' | 'PROD' | 'PREPROD' | 'STAGING' | 'DEV';
export interface EnvFilter {
	label: EnvLabel;
	value: EnvId;
}
export type RunStatusLabel = 'All Status' | 'Success' | 'Failed' | 'Running' | 'Checked';
export type RunStatusId = 'ALL' | 'SUCCESS' | 'FAILED' | 'RUNNING' | 'CHECKED';
export interface RunStatusFilter {
	label: RunStatusLabel;
	value: RunStatusId;
}
export type ConfActivatedLabel = 'All Status' | 'Activated' | 'Disabled' | 'Archived';
export type ConfActivatedValue = 'ALL' | boolean;
export interface ConfActivatedFilter {
	label: ConfActivatedLabel;
	value: ConfActivatedValue;
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
	confActivatedFilterSelected: ConfActivatedFilter;
	confActivatedFilters: ConfActivatedFilter[];
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
export interface ItemComponentProps {
	type: string;
	docId: string;
	tabsItems: object[];
	isLoading: boolean;
	isNotFound: boolean;
	updateInformation?: Object;
	moduleName?: string;
	archivedConfsModuleName?: string;
}

export interface Link {
	icon: string;
	title: string;
	link: Location;
	displayRule?(): boolean;
}

export interface Snackbar {
	show: boolean;
	timeout: number;
}

export type RunStatus = 'SUCCESS' | 'FAILED' | 'RUNNING' | 'CHECKED';

export type AnyObject = { [index: string]: any };

// DataWorkflows
export type DataWorkflowsType = 'runs' | 'configurations' | 'status' | null;

// Configuration
export interface Configuration {
	[key: string]: any;
}

// Filters
// TODO: Define type
export type WhereConfFilter = any;

// Storage to Storage
export type DestinationStorageRows = {
	gcs: Object[];
	s3: Object[];
	sftp: Object[];
};

// Data
export interface TableParameter {
	id: string;
	label: string;
	value: any;
}
