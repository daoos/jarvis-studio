<template>
	<div class="accounts-selector-wrapper">
		<v-autocomplete
			v-model="selectedAccounts"
			:items="getItems"
			item-text="account_name"
			return-object
			:label="selectedAccounts.length === 0 ? 'All Accounts' : 'Accounts'"
			no-data-text="No accounts available"
			hide-details
			small-chips
			multiple
			chips
		>
			<template v-slot:selection="{ index, item }">
				<span v-if="index === 0">{{ item.account_name }}</span>
				<span v-if="index === 1" class="other-accounts caption">(+{{ selectedAccounts.length - 1 }} others)</span>
			</template>
		</v-autocomplete>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import store from '@/store';

export default {
	name: 'accounts-selector',
	data() {
		return {
			isLoading: true,
			selectedAccounts: JSON.parse(localStorage.vuex).filters.filteredAccounts
		};
	},
	computed: {
		...mapState({
			accounts: state => state.accounts.data,
			user: state => state.user.user
		}),
		...mapGetters({
			userAccounts: 'user/accounts'
		}),
		getItems() {
			let items = [];

			this.userAccounts.forEach(id => {
				const element = this.accounts[id];
				if (element) items.push(element);
			});

			return items;
		}
	},
	watch: {
		selectedAccounts(accounts) {
			store.dispatch('filters/updateFilteredAccounts', accounts);
		}
	}
};
</script>

<style lang="scss">
.accounts-selector-wrapper {
	max-width: 260px;

	.other-accounts {
		margin-left: 0.5em;
	}
}
</style>
