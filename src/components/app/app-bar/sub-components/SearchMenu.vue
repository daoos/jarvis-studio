<template>
	<div class="d-flex align-center">
		<v-btn icon @click.native="searchBegin">
			<v-icon>search</v-icon>
		</v-btn>

		<div class="searching" :class="{ 'mr-2': searching, 'searching--closed': !searching }">
			<v-text-field
				ref="search"
				v-model="search"
				append-icon="close"
				label="Search"
				hide-details
				single-line
				@click:append="clearSearch"
				@blur="clearSearch"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchMenu extends Vue {
	searching: boolean = false;
	search: string = '';

	searchBegin() {
		this.searching = true;
		// @ts-ignore
		setTimeout(() => this.$refs.search.focus(), 200);
	}

	clearSearch() {
		this.searching = false;
		this.search = '';
	}
}
</script>

<style lang="scss" scoped>
@import '../../../../../node_modules/vuetify/src/components/VBtn/variables';

.searching {
	width: 208px;
	transition: $primary-transition;

	&--closed {
		width: 0;

		& > * {
			display: none;
		}
	}
}
</style>
