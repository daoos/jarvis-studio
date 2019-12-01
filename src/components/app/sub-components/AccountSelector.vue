<template>
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
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';

export default {
	name: 'account-selector',
	methods: {
		applyAccountFilter(selectedAccount) {
			store.dispatch('applyAccountFilterSelected', selectedAccount);
		}
	},
	computed: {
		...mapState({
			accountFilterSelected: state => state.filters.accountFilterSelected,
			accounts: state => state.accounts.data
		}),
		accountArray() {
			return [...Object.values(this.accounts), { account_name: 'All Accounts', id: '000000' }];
		}
	}
};
</script>
