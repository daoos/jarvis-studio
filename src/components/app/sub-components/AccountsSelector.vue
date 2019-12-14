<template>
	<div class="accounts-selector-wrapper">
		<v-autocomplete
			v-if="user"
			v-model="selectedAccounts"
			:items="Object.values(accounts)"
			item-text="account_name"
			return-object
			label="Accounts"
			no-data-text="No accounts available"
			hide-details
			small-chips
			multiple
			chips
		>
			<template v-slot:selection="{ index, item }">
				<span v-if="index === 0">{{ item.account_name }}</span>
				<span v-if="index === 1" class="other-accounts caption">(+{{ filteredAccounts.length - 1 }} others)</span>
			</template>
		</v-autocomplete>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';

export default {
	name: 'accounts-selector',
	data() {
		return {
			isLoading: true
		};
	},
	computed: {
		...mapState({
			accounts: state => state.accounts.data,
			// TODO: Remove this & use selectedAccounts length in template
			filteredAccounts: state => state.filters.filteredAccounts,
			user: state => state.user.user
		}),
		selectedAccounts: {
			get() {
				return JSON.parse(localStorage.vuex).filters.filteredAccounts;
			},
			set(accounts) {
				store.dispatch('updateFilteredAccounts', accounts);
			}
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
