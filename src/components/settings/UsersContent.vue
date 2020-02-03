<template>
	<v-container fluid>
		<v-toolbar class="elevation-0" color="transparent">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<v-dialog v-model="dialog" max-width="700px">
				<template v-slot:activator="{ on }">
					<v-btn color="primary" dark class="mb-2" v-on="on">New User</v-btn>
				</template>

				<v-card>
					<v-card-title>
						<span class="headline">{{ formTitle }}</span>
					</v-card-title>

					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12">
									<v-text-field v-model="editedUser.email" label="Email" />
								</v-col>

								<v-col cols="12">
									<v-text-field v-model="editedUser.displayName" label="Display Name" />
								</v-col>

								<v-col cols="12">
									<v-text-field
										v-model="editedUser.password"
										:append-icon="showPassword ? 'visibility' : 'visibility_off'"
										:type="showPassword ? 'text' : 'password'"
										name="password"
										label="Password"
										hint="At least 8 characters"
										counter
										@click:append="showPassword = !showPassword"
									/>
								</v-col>

								<v-col cols="12">
									<v-text-field v-model="editedUser.emailVerified" label="Email Verified" />
								</v-col>

								<v-col cols="12">
									<v-text-field v-model="editedUser.disabled" label="Disabled" />

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

						<v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
						<v-btn color="blue darken-1" text @click="createUser">Create User</v-btn>
						<v-btn color="blue darken-1" text @click="addRolesAndAccounts">Update User</v-btn>
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
			<v-btn text @click="snackbarParam.isVisible = false">Close</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import merge from 'lodash.merge';
import { AnyObject, Role, Snackbar, User } from '@/types';
import { SNACKBAR } from '@/constants/ui/snackbar';

// TODO: Refactor component

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
	editedUserIndex: number = -1;
	editedUser: AnyObject = {
		email: '',
		customClaims: {},
		displayName: '',
		emailVerified: false,
		disabled: false,
		creationTime: Date.now(),
		password: ''
	};
	defaultUser: AnyObject = {
		email: '',
		customClaims: {},
		displayName: '',
		emailVerified: false,
		disabled: false,
		creationTime: Date.now(),
		password: ''
	};
	studioRoles: Role[] = [
		{ roleName: 'Member', roleCode: 0 },
		{ roleName: 'Viewer', roleCode: 1 },
		{ roleName: 'User', roleCode: 2 },
		{ roleName: 'Writer', roleCode: 3 },
		{ roleName: 'Admin', roleCode: 4 },
		{ roleName: 'Super Admin', roleCode: 5 }
	];
	search: string = '';
	isLoading: boolean = false;

	mounted() {
		this.listAllUsers();
	}

	listAllUsers() {
		this.isLoading = true;

		const listAllUsers = firebase.functions().httpsCallable('listAllUsers');
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
		if (this.editedUserIndex > -1) {
			const createUser = firebase.functions().httpsCallable('createUser');
			createUser({
				email: this.editedUser.email,
				displayName: this.editedUser.displayName,
				emailVerified: this.editedUser.emailVerified,
				photoURL: 'https://raw.githubusercontent.com/mkfeuhrer/JarvisBot/master/images/JarvisBot.gif',
				password: this.editedUser.password,
				disabled: this.editedUser.disabled,
				accounts: this.selectedAccounts,
				studioRoles: this.selectedStudioRoles
			}).then(() => {
				this.listAllUsers();
			});
		} else {
			this.users.push(this.editedUser);
		}
		this.close();
	}

	editUser(user: User) {
		this.editedUserIndex = this.users.indexOf(user);
		this.editedUser = Object.assign({}, user);
		if (
			this.editedUser.customClaims == null ||
			typeof this.editedUser.customClaims.accounts === 'undefined' ||
			this.editedUser.customClaims.accounts === null
		) {
			this.selectedAccounts = [];
		} else {
			this.selectedAccounts = this.editedUser.customClaims.accounts;
		}
		if (
			this.editedUser.customClaims == null ||
			typeof this.editedUser.customClaims.studioRoles === 'undefined' ||
			this.editedUser.customClaims.studioRoles === null
		) {
			this.selectedStudioRoles = 0;
		} else {
			this.selectedStudioRoles = this.editedUser.customClaims.studioRoles;
		}
		this.dialog = true;
	}

	addRolesAndAccounts() {
		if (this.editedUserIndex > -1) {
			const addRolesAndAccounts = firebase.functions().httpsCallable('addRolesAndAccounts');
			addRolesAndAccounts({
				email: this.editedUser.email,
				accounts: this.selectedAccounts,
				studioRoles: this.selectedStudioRoles
			}).then(() => {
				this.listAllUsers();
			});
		} else {
			this.users.push(this.editedUser);
		}
		this.close();
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

	close() {
		this.dialog = false;
		setTimeout(() => {
			this.editedUser = Object.assign({}, this.defaultUser);
			//this.editedUserIndex = -1;
		}, 300);
	}

	get headers() {
		return [
			{ text: 'Email', align: 'left', sortable: true, value: 'email' },
			{ text: 'Display Name', align: 'left', sortable: true, value: 'displayName' },
			{ text: 'Email Verified', value: 'emailVerified' },
			{ text: 'Disabled', value: 'disabled' },
			{ text: 'Nb Accounts', value: 'nb_accounts' },
			{ text: 'Roles', value: 'studioRolesIndex' },
			{ text: 'Actions', value: 'action', sortable: false }
		];
	}

	get formTitle() {
		return this.editedUserIndex === -1 ? 'New User' : 'Edit User';
	}

	get accountsFormatted() {
		return Object.values(this.accounts);
	}
}
</script>
