<template>
	<v-toolbar dense tabs color="primary">
		<v-toolbar-title class="pl-2 display-1">{{ headerTitle }}</v-toolbar-title>

		<v-tabs color="white" slider-color="white" slot="extension" background-color="primary">
			<v-tab v-for="tabsItem in tabsItems" :key="tabsItem.id" :to="tabsItem.link">
				<span class="pl-2 pr-2">{{ tabsItem.title }}</span>
			</v-tab>
		</v-tabs>
	</v-toolbar>
</template>

<script>
export default {
	props: {
		tabsItems: Array,
		headerTitle: String
	},
	data() {
		return {
			tabs: null
		};
	}
};
</script>

<style lang="scss" scoped>
.disabled {
	color: black;
	pointer-events: none;
}
</style>
