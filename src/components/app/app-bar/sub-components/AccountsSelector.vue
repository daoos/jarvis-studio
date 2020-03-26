<template>
	<div class="d-flex align-center">
		<v-btn icon @click.native="focusAutocomplete">
			<v-badge color="secondary" overlap>
				<span slot="badge">{{ selectedAccounts.length === 0 ? userAccounts.length : selectedAccounts.length }}</span>
				<v-icon>mdi-account-group</v-icon>
			</v-badge>
		</v-btn>

		<div class="selector" :class="{ 'selector--closed': !isFocused }">
			<v-autocomplete
				v-if="isFocused"
				v-model="selectedAccounts"
				ref="autocomplete"
				:items="getItems"
				item-text="account_name"
				return-object
				:label="selectedAccounts.length === 0 ? 'All Accounts' : 'Accounts'"
				no-data-text="No accounts available"
				single-line
				hide-details
				small-chips
				multiple
				chips
				@blur="blurAutocomplete"
			>
				<template v-slot:selection="{ index, item }">
					<span v-if="index === 0">{{ item.account_name }}</span>
					<span v-if="index === 1" class="other-accounts caption">(+{{ selectedAccounts.length - 1 }} others)</span>
				</template>
			</v-autocomplete>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Account, AccountId } from '@/types';
import { Getter, State } from 'vuex-class';
import store from '@/store';

@Component
export default class AccountSelector extends Vue {
	@State(state => state.accounts.data) accounts!: { [key: string]: AccountId };
	@Getter('user/accounts') userAccounts!: AccountId[];

	@Watch('selectedAccounts')
	onSelectedAccountsChange(accounts: Account[]) {
		store.dispatch('filters/updateFilteredAccounts', accounts);
	}

	isFocused: boolean = false;
	selectedAccounts: Account[] = JSON.parse(localStorage.vuex).filters.filteredAccounts;

	focusAutocomplete() {
		this.isFocused = true;
		// @ts-ignore
		setTimeout(() => this.$refs.autocomplete.focus(), 200);
	}

	blurAutocomplete() {
		this.isFocused = false;
	}

	get getItems() {
		let items: AccountId[] = [];

		this.userAccounts.forEach((id: AccountId) => {
			const element = this.accounts[id];
			if (element) items.push(element);
		});

		return items;
	}
}
</script>

<style lang="scss" scoped>
@import '../../../../../node_modules/vuetify/src/components/VBtn/variables';

.selector {
	width: 208px;
	transition: $primary-transition;

	&--closed {
		width: 0;

		& > * {
			display: none;
		}
	}

	.other-accounts {
		margin-left: 0.5em;
	}
}
</style>
