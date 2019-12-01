<template>
	<v-toolbar dense color="primary" dark extended extension-height="300" text>
		<v-toolbar-title class="mx-auto text-center" slot="extension">
			<h2>{{ title }}</h2>
			<span>{{ subTitle }}</span>
		</v-toolbar-title>
	</v-toolbar>
</template>

<script>
export default {
	name: 'data-overview-header',
	props: {
		title: {
			type: String,
			required: true
		},
		subTitle: String
	}
};
</script>
