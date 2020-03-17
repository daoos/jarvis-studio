<template>
	<div class="accounts-selector-wrapper">
		<v-btn icon @click.native="focusAutocomplete">
			<v-badge color="secondary" overlap>
				<span slot="badge">2</span>
				<v-icon>mdi-account-group</v-icon>
			</v-badge>
		</v-btn>

		<v-autocomplete
			v-if="isFocused"
			v-model="selectedAccounts"
			ref="autocomplete"
			:items="getItems"
			item-text="account_name"
			return-object
			:label="selectedAccounts.length === 0 ? 'All Accounts' : 'Accounts'"
			no-data-text="No accounts available"
			hide-details
			small-chips
			multiple
			chips
			class="searching"
			:class="{ 'is-closed': !isFocused }"
			@blur="blurAutocomplete"
		>
			<template v-slot:selection="{ index, item }">
				<span v-if="index === 0">{{ item.account_name }}</span>
				<span v-if="index === 1" class="other-accounts caption">(+{{ selectedAccounts.length - 1 }} others)</span>
			</template>
		</v-autocomplete>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Account } from '@/types';
import { Getter, State } from 'vuex-class';
import store from '@/store';

@Component
export default class AccountSelector extends Vue {
	@State(state => state.accounts.data) accounts: Account[];
	@Getter('user/accounts') userAccounts: Account[];

	@Watch('selectedAccounts')
	onSelectedAccountsChange(accounts: Account[]) {
		store.dispatch('filters/updateFilteredAccounts', accounts);
	}

	isFocused: boolean = false;
	selectedAccounts: Account[] = JSON.parse(localStorage.vuex).filters.filteredAccounts;

	focusAutocomplete() {
		this.isFocused = true;
		setTimeout(() => this.$refs.autocomplete.focus(), 200);
	}

	blurAutocomplete() {
		this.isFocused = false;
	}

	get getItems() {
		let items = [];

		this.userAccounts.forEach(id => {
			const element = this.accounts[id];
			if (element) items.push(element);
		});

		return items;
	}
}
</script>

<style lang="scss">
@import '../../../../../node_modules/vuetify/src/components/VBtn/variables';

.accounts-selector-wrapper {
	// width: 260px;

	.other-accounts {
		margin-left: 0.5em;
	}
}

.searching {
	width: 208px;
	transition: $primary-transition;
}

.is-closed {
	width: 0;

	& > * {
		display: none;
	}
}
</style>
