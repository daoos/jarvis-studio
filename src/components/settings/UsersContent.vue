<template>
	<v-container fluid>
		<v-toolbar class="elevation-0" color="transparent">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<v-dialog v-model="dialog" max-width="700px">
				<template v-slot:activator="{ on }">
					<v-btn @click="resetCurrentUser" color="primary" dark class="mb-2" v-on="on">New User</v-btn>
				</template>

				<v-card>
					<v-card-title>
						<span class="headline">{{ formTitle }}</span>
					</v-card-title>

					<v-card-text>
						<v-container>
							<v-row v-if="isEditing && (isUserDisabled || !isUserEmailVerified)">
								<v-col cols="12">
									<v-alert v-if="isUserDisabled" type="warning">
										{{ currentUser.displayName }} has been disabled.
									</v-alert>
									<v-alert v-if="!isUserEmailVerified" type="warning">
										{{ currentUser.displayName }} doesn't verified his email address.
									</v-alert>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12">
									<v-text-field v-model="currentUser.email" label="Email" :disabled="isUserDisabled" />
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="6">
									<v-text-field v-model="currentUser.displayName" label="Display Name" :disabled="isUserDisabled" />
								</v-col>

								<v-col cols="6">
									<v-text-field
										v-model="currentUser.password"
										:append-icon="showPassword ? 'visibility' : 'visibility_off'"
										:type="showPassword ? 'text' : 'password'"
										name="password"
										label="Password"
										hint="At least 8 characters"
										counter
										@click:append="showPassword = !showPassword"
									/>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="6">
									<v-select
										v-model="selectedAccounts"
										:items="accountsFormatted"
										label="Accounts"
										multiple
										chips
										hint="Select the accounts to add to the user"
										persistent-hint
										item-text="account_name"
										item-value="id"
									/>
								</v-col>

								<v-col cols="6">
									<v-select
										v-model="selectedStudioRoles"
										:items="studioRoles"
										label="Role"
										single-line
										hint="Select the role to add to the user"
										persistent-hint
										item-key="roleName"
										item-text="roleName"
										item-value="roleCode"
									/>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer />

						<v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
						<v-btn v-if="isEditing" color="primary" @click="updateUser">Update User</v-btn>
						<v-btn v-else color="primary" @click="createUser">Create User</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-icon right @click="listAllUsers" v-if="!isLoading">refresh</v-icon>

			<v-progress-circular indeterminate size="20" color="primary" v-if="isLoading" />
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="users"
			class="elevation-1"
			:search="search"
			:loading="isLoading"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.sortDesc"
			item-key="key"
			light
		>
			<template v-slot:item.action="{ item }">
				<div class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="editUser(item)">edit</v-icon>
					<v-icon small @click="deleteUser(item)">delete</v-icon>
				</div>
			</template>

			<template v-slot:no-data>
				<v-btn color="primary" @click="listAllUsers">Reset</v-btn>
			</template>
		</v-data-table>

		<v-snackbar v-model="snackbarParam.isVisible" :color="snackbarParam.color" :timeout="3500">
			{{ snackbarParam.message }}
			<v-btn text @click="snackbarParam.isVisible = false">closeDialog</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import merge from 'lodash.merge';
import { AnyObject, FirestoreAccount, Role, Snackbar, User } from '@/types';
import { SNACKBAR } from '@/constants/ui/snackbar';
import { ADMIN, MEMBER, SUPER_ADMIN, USER, VIEWER, WRITER } from '@/constants/user/roles';
import { DataTableHeader } from 'vuetify';

@Component({
	computed: {
		...mapState({ accounts: (state: any) => state.accounts.data }),
		...mapGetters(['periodFiltered', 'filters/whereConfFilter'])
	}
})
export default class UsersContent extends Vue {
	accounts: any;
	snackbarParam: Snackbar = { isVisible: false, timeout: SNACKBAR.TIMEOUT, message: '', color: 'info' };
	users: AnyObject[] = [];
	selectedAccounts: string[] = [];
	selectedStudioRoles: number = 0;
	dialog: boolean = false;
	showPassword: boolean = false;
	pagination = { sortBy: 'email', sortDesc: false }; // TODO: type
	currentUser: AnyObject = {
		email: '',
		customClaims: {},
		displayName: '',
		emailVerified: false,
		disabled: false,
		creationTime: Date.now(),
		password: ''
	};
	isEditing: boolean = false;
	studioRoles: Role[] = [MEMBER, VIEWER, USER, WRITER, ADMIN, SUPER_ADMIN];
	search: string = '';
	isLoading: boolean = false;

	mounted() {
		this.listAllUsers();
	}

	resetCurrentUser() {
		this.isEditing = false;
		this.currentUser = {};
		this.selectedAccounts = [];
		this.selectedStudioRoles = 0;
	}

	listAllUsers() {
		this.isLoading = true;

		const listAllUsers = firebase.functions().httpsCallable('listUsers');
		listAllUsers({}).then(res => {
			const dataUsers = Object.values(res.data.users);

			let usersFormatted = res.data.users.map(function(user: User) {
				let nb_accounts = 0;
				try {
					nb_accounts = user.customClaims.accounts.length;
				} catch (error) {
					nb_accounts = 0;
				}
				let studioRolesIndex = 0;
				try {
					studioRolesIndex = user.customClaims.studioRoles;
				} catch (error) {
					studioRolesIndex = 0;
				}
				return {
					nb_accounts: nb_accounts,
					studioRolesIndex: studioRolesIndex
				};
			});

			this.users = merge(dataUsers, usersFormatted);
			this.isLoading = false;
		});
	}

	createUser() {
		const createUser = firebase.functions().httpsCallable('createUser');
		createUser({
			email: this.currentUser.email,
			displayName: this.currentUser.displayName,
			emailVerified: this.currentUser.emailVerified,
			photoURL: 'https://raw.githubusercontent.com/mkfeuhrer/JarvisBot/master/images/JarvisBot.gif',
			password: this.currentUser.password,
			disabled: this.currentUser.disabled,
			accounts: this.selectedAccounts,
			studioRoles: this.selectedStudioRoles
		}).then(() => {
			this.listAllUsers();
			this.users.push(this.currentUser);
			this.closeDialog();
		});
	}

	editUser(user: User) {
		this.isEditing = true;
		this.currentUser = user;
		if (
			this.currentUser.customClaims == null ||
			typeof this.currentUser.customClaims.accounts === 'undefined' ||
			this.currentUser.customClaims.accounts === null
		) {
			this.selectedAccounts = [];
		} else {
			this.selectedAccounts = this.currentUser.customClaims.accounts;
		}
		if (
			this.currentUser.customClaims == null ||
			typeof this.currentUser.customClaims.studioRoles === 'undefined' ||
			this.currentUser.customClaims.studioRoles === null
		) {
			this.selectedStudioRoles = 0;
		} else {
			this.selectedStudioRoles = this.currentUser.customClaims.studioRoles;
		}
		this.dialog = true;
	}

	updateUser() {
		if (this.isEditing) {
			const addRolesAndAccounts = firebase.functions().httpsCallable('updateUser');
			addRolesAndAccounts({
				accounts: this.selectedAccounts,
				email: this.currentUser.email,
				displayName: this.currentUser.displayName,
				photoURL: this.currentUser.photoURL,
				studioRoles: this.selectedStudioRoles
			});
		} else {
			this.users.push(this.currentUser);
		}
		this.closeDialog();
	}

	deleteUser(user: User) {
		// TODO: show modal
		const result = confirm('Are you sure you want to delete this user?');
		const deleteUser = firebase.functions().httpsCallable('deleteUser');
		const index = this.users.indexOf(user);

		if (result) {
			this.isLoading = true;

			deleteUser({ email: user.email }).then(res => {
				// TODO: show snackBar
				this.users.splice(index, 1);
				this.isLoading = false;
			});
		}
	}

	closeDialog() {
		this.dialog = false;
	}

	get headers(): DataTableHeader[] {
		return [
			{ text: 'Email', sortable: true, value: 'email' },
			{ text: 'Display Name', sortable: true, value: 'displayName' },
			{ text: 'Email Verified', value: 'emailVerified' },
			{ text: 'Disabled', value: 'disabled' },
			{ text: 'Nb Accounts', value: 'nb_accounts' },
			{ text: 'Roles', value: 'studioRolesIndex' },
			{ text: 'Actions', value: 'action', sortable: false }
		];
	}

	get isUserDisabled(): boolean {
		return this.currentUser.disabled;
	}

	get isUserEmailVerified(): boolean {
		return this.currentUser.emailVerified;
	}

	get formTitle(): string {
		return this.isEditing ? 'Edit User' : 'New User';
	}

	get accountsFormatted(): FirestoreAccount[] {
		return Object.values(this.accounts);
	}
}
</script>
