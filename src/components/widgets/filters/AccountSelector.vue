<template>
	<v-row v-if="viewAccount">
		<v-menu :nudge-width="100" :class="true ? 'hidden-xs-only' : ''">
			<v-toolbar-title slot="activator" class="pl-2">
				<span class="body-2 contrast--text">{{
					accountFilterSelected.account_name
				}}</span>
				<v-icon class="contrast--text">arrow_drop_down</v-icon>
			</v-toolbar-title>
			<v-list light>
				<v-list-item
					v-for="account in accountArray"
					:key="account.id"
					@click="applyAccountFilter(account)"
				>
					<v-list-item-title v-text="account.account_name"></v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-row>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";

export default {
	components: {},
	props: {
		viewAccount: Boolean
	},
	data: () => ({}),
	created() {},
	methods: {
		applyAccountFilter(accountFilterSelected) {
			store.dispatch("applyAccountFilterSelected", accountFilterSelected);
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			accountFilterSelected: state => state.filters.accountFilterSelected,
			accounts: state => state.accounts.data
		}),
		accountArray() {
			let accountArray = {};
			// if (this.user.studioRoles == 5) {
			//   accountArray = Object.values(this.accounts);
			//   accountArray.push({ account_name: "All Accounts", id: "000000" });
			// } else if (this.user.accounts.length > 0) {
			//   for (const account of this.user.accounts) {
			//     accountArray.push({ account_name: account, id: account });
			//   }
			// }
			accountArray = Object.values(this.accounts);
			accountArray.push({ account_name: "All Accounts", id: "000000" });
			return accountArray;
		},
		//Set the selected account to the accounts attached to the user Custom Claim
		accountFilterSelectedForUser() {
			let accountFilterSelectedForUser = {};
			if (this.user.studioRoles == 5) {
				accountFilterSelectedForUser = this.accountFilterSelected;
			}
			if (this.user.accounts.length > 0) {
				accountFilterSelectedForUser = {
					account_name: this.user.accounts[0],
					id: this.user.accounts[0]
				};
			}
			return accountFilterSelectedForUser;
		}
	}
};
</script>
