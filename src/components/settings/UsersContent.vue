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
										:append-icon="editedUser.showpassword ? 'visibility' : 'visibility_off'"
										:type="editedUser.showpassword ? 'text' : 'password'"
										name="password"
										label="Password"
										hint="At least 8 characters"
										counter
										@click:append="editedUser.showpassword = !editedUser.showpassword"
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
										v-model="selectedRoles"
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

			<v-icon right @click="listAllUsers" v-if="!isFetchAndAdding">refresh</v-icon>

			<v-progress-circular indeterminate size="20" color="primary" v-if="isFetchAndAdding" />
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="users"
			class="elevation-1"
			:search="search"
			:loading="isFetchAndAdding"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.descending"
			item-key="key"
			light
		>
			<template v-slot:item.action="{ item }">
				<div class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="editUser(item)">
						edit
					</v-icon>

					<v-icon small @click="deleteUser(item)">
						delete
					</v-icon>
				</div>
			</template>

			<template v-slot:no-data>
				<v-btn color="primary" @click="listAllUsers">Reset</v-btn>
			</template>
		</v-data-table>

		<v-snackbar v-model="snackbarParam.show" :color="snackbarParam.color" :timeout="3500">
			{{ snackbarParam.message }}
			<v-btn text @click="snackbarParam.show = false">Close</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script>
import store from '@/store';
import firebase from 'firebase';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
	name: 'users-content',
	data: () => ({
		snackbarParam: { message: '', show: false, color: 'info' },
		alertParam: { message: '', show: false, color: 'info', dismissible: true },
		users: [],
		selectedAccounts: [],
		selectedRoles: 0,
		dialog: false,
		pagination: {
			sortBy: 'email',
			descending: false,
			rowsPerPage: 50
		},
		headers: [
			{
				text: 'Email',
				align: 'left',
				sortable: true,
				value: 'email'
			},
			{
				text: 'Display Name',
				align: 'left',
				sortable: true,
				value: 'displayName'
			},
			{ text: 'Email Verified', value: 'emailVerified' },
			{ text: 'Disabled', value: 'disabled' },
			{ text: 'Nb Accounts', value: 'nb_accounts' },
			{ text: 'Roles', value: 'studioRolesIndex' },
			{ text: 'Actions', value: 'action', sortable: false }
		],
		editedUserIndex: -1,
		editedUser: {
			email: '',
			displayName: '',
			emailVerified: false,
			disabled: false,
			creationTime: Date.now(),
			password: '',
			showpassword: false,
			rules: {
				//required: value => !!value || "Required.",
				min: v => v.length >= 8 || 'Min 8 characters'
			}
		},
		defaultUser: {
			email: '',
			displayName: '',
			emailVerified: false,
			disabled: false,
			creationTime: Date.now(),
			password: '',
			showpassword: false,
			rules: {
				//required: value => !!value || "Required.",
				min: v => v.length >= 8 || 'Min 8 characters'
			}
		},
		studioRoles: [
			{ roleName: 'Member', roleCode: 0 },
			{ roleName: 'Viewer', roleCode: 1 },
			{ roleName: 'User', roleCode: 2 },
			{ roleName: 'Writer', roleCode: 3 },
			{ roleName: 'Admin', roleCode: 4 },
			{ roleName: 'Super Admin', roleCode: 5 }
		],
		search: '',
		isFetchAndAdding: false,
		snackbarParam: { message: '', show: false, color: 'info' }
	}),
	mounted() {
		this.listAllUsers();
	},
	methods: {
		listAllUsers() {
			this.isFetchAndAdding = true;
			const listAllUsers = firebase.functions().httpsCallable('listAllUsers');
			//list all email users
			listAllUsers({}).then(res => {
				// store the users list
				const dataUsers = Object.values(res.data.users);
				let usersFormated = res.data.users.map(function(data) {
					let nb_accounts = 0;
					try {
						nb_accounts = data.customClaims.accounts.length;
					} catch (error) {
						nb_accounts = 0;
					}
					let studioRolesIndex = 0;
					try {
						studioRolesIndex = data.customClaims.studioRoles;
					} catch (error) {
						studioRolesIndex = 0;
					}
					return {
						nb_accounts: nb_accounts,
						studioRolesIndex: studioRolesIndex
					};
				});
				this.users = _.merge(dataUsers, usersFormated);
				this.isFetchAndAdding = false;
			});
		},
		editUser(item) {
			this.editedUserIndex = this.users.indexOf(item);
			this.editedUser = Object.assign({}, item);
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
				this.selectedRoles = 0;
			} else {
				this.selectedRoles = this.editedUser.customClaims.studioRoles;
			}
			this.dialog = true;
		},
		deleteUser(item) {
			const index = this.users.indexOf(item);
			confirm('Are you sure you want to delete this user?') && this.users.splice(index, 1);
		},
		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedUser = Object.assign({}, this.defaultUser);
				//this.editedUserIndex = -1;
			}, 300);
		},
		save() {
			if (this.editedUserIndex > -1) {
				Object.assign(this.users[this.editedUserIndex], this.editedUser);
			} else {
				this.users.push(this.editedUser);
			}
			this.close();
		},
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
					studioRoles: this.selectedRoles
				}).then(() => {
					this.listAllUsers();
				});
			} else {
				this.users.push(this.editedUser);
			}
			this.close();
		},
		addRolesAndAccounts() {
			if (this.editedUserIndex > -1) {
				const addRolesAndAccounts = firebase.functions().httpsCallable('addRolesAndAccounts');
				addRolesAndAccounts({
					email: this.editedUser.email,
					accounts: this.selectedAccounts,
					studioRoles: this.selectedRoles
				}).then(() => {
					this.listAllUsers();
				});
			} else {
				this.users.push(this.editedUser);
			}
			this.close();
		}
	},
	computed: {
		...mapState({
			accounts: state => state.accounts.data
		}),
		...mapGetters(['periodFiltered', 'filters/whereConfFilter']),
		formTitle() {
			return this.editedUserIndex === -1 ? 'New User' : 'Edit User';
		},
		accountsFormatted() {
			return Object.values(this.accounts);
		}
	},
	watch: {
		dialog(val) {
			val || this.close();
		}
	}
};
</script>
