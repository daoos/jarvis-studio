<template>
	<v-row class="fill-height" align="center" justify="end">
		<v-btn icon @click.native="searchBegin">
			<v-icon>search</v-icon>
		</v-btn>

		<div :class="{ 'searching--closed': !searching }" class="searching">
			<v-text-field
				ref="search"
				v-model="search"
				append-icon="close"
				label="Search"
				hide-details
				single-line
				color="white"
				@click:append="searchEnd"
				@blur="onBlur"
			/>
		</div>
	</v-row>
</template>

<script>
// TODO: Use Algolia search

export default {
	components: {},
	data: () => ({
		searching: false,
		search: ""
	}),
	created() {},
	methods: {
		onBlur() {
			this.searching = false;
			this.search = "";
		},
		searchBegin() {
			this.searching = true;
			setTimeout(() => this.$refs.search.focus(), 200);
		},
		searchEnd() {
			this.searching = false;
			this.search = "";
		}
	}
};
</script>

<style scoped lang="scss">
@import "../../../../node_modules/vuetify/src/components/VBtn/variables";

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
.list-border-bottom {
	border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
