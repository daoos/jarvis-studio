<template>
	<div class="accounts-selector-wrapper">
		<v-autocomplete
			v-model="selectedAccounts"
			:items="Object.values(accounts)"
			label="Accounts"
			item-text="account_name"
			return-object
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
import { mapState } from 'vuex';
import store from '@/store';

export default {
	name: 'accounts-selector',
	data() {
		return {
			selectedAccounts: []
		};
	},
	methods: {
		applyAccountFilter(selectedAccount) {
			store.dispatch('applyAccountFilterSelected', selectedAccount).then(() => {
				console.log(this.user.accounts);
			});
		}
	},
	computed: {
		...mapState({
			accountFilterSelected: state => state.filters.accountFilterSelected,
			accounts: state => state.accounts.data,
			user: state => state.user.user
		})
	},
	watch: {
		selectedAccounts(value) {
			console.log(value);
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
