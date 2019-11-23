<template>
	<v-row>
		<v-menu top offset-y>
			<template v-slot:activator="{ on }">
				<v-btn v-on="on" text>
					<span class="body-2">{{ accountFilterSelected.account_name }}</span>
					<v-icon>arrow_drop_down</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item v-for="account in accountArray" :key="account.id" @click="applyAccountFilter(account)">
					<v-list-item-title v-text="account.account_name" />
				</v-list-item>
			</v-list>
		</v-menu>
	</v-row>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";

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
			user: state => state.user.user,
			accountFilterSelected: state => state.filters.accountFilterSelected,
			accounts: state => state.accounts.data
		}),
		accountArray() {
			let accountArray = {};
			accountArray = Object.values(this.accounts);
			accountArray.push({ account_name: "All Accounts", id: "000000" });
			return accountArray;
		}
	}
};
</script>
