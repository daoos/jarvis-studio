<template>
	<v-row class="fill-height" align="center" justify="end" v-if="viewSearch">
		<v-btn icon @click.native.stop="searchBegin">
			<v-icon>search</v-icon>
		</v-btn>
		<div :class="{ 'searching--closed': !searching }" class="searching">
			<v-text-field
				id="search"
				v-model="search"
				append-icon="close"
				@click:append="searchEnd"
				label="Search"
				hide-details
				single-line
				color="white"
				@blur="onBlur"
			></v-text-field>
		</div>
	</v-row>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";

export default {
	components: {},
	props: {
		viewSearch: Boolean
	},
	data: () => ({
		// Search bar variables
		searching: false,
		search: ""
	}),
	created() {},
	methods: {
		applyAccountFilter(accountFilterSelected) {
			store.dispatch("applyAccountFilterSelected", accountFilterSelected);
		},
		// Method to manage the menu search bar
		onBlur() {
			this.searching = false;
			this.search = "";
		},
		searchBegin() {
			this.searching = true;
			setTimeout(() => document.querySelector("#search").focus(), 50);
		},
		searchEnd() {
			this.searching = false;
			this.search = "";
			document.querySelector("#search").blur();
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
			let accountArray = Object.values(this.accounts);
			accountArray.push({ account_name: "All Accounts", id: "000000" });
			return accountArray;
		}
	}
};
</script>

<style scoped lang="scss">
// @import '~vuetify/src/stylus/settings/_variables.styl'
.bottom-menu {
	position: absolute;
	width: 100%;
	bottom: 0;
}
.searching {
	overflow: hidden;
	width: 208px;
	padding-left: 8px;
	transition: $primary-transition;
}
.searching--closed {
	padding-left: 0;
	width: 0;
}
.searching > * {
	right: 8px;
}
.searching--closed > * {
	display: none;
}
.hidden-searching {
	@media $display-breakpoints.sm-and-down {
		display: none !important;
	}
}
.list-border-bottom {
	border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
