<template>
	<div class="accounts-selector-wrapper">
		<!-- item-text="account_name" | return-object -->

		<v-autocomplete
			v-if="user"
			v-model="selectedAccounts"
			:items="user.accounts"
			label="Accounts"
			no-data-text="No accounts available"
			hide-details
			small-chips
			multiple
			chips
		>
			<template v-slot:selection="{ index, item }">
				<span v-if="index === 0">{{ item }}</span>
				<span v-if="index === 1" class="other-accounts caption">(+{{ selectedAccounts.length - 1 }} others)</span>
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
			isLoading: true,
			selectedAccounts: []
		};
	},
	computed: {
		...mapState({
			accounts: state => state.accounts.data,
			user: state => state.user.user
		})
	},
	watch: {
		selectedAccounts(accounts) {
			store.dispatch('updateFilteredAccounts', accounts);
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
