<template>
	<v-toolbar dense tabs flat color="background">
		<v-toolbar-title class="pl-2 display-1">{{ title }}</v-toolbar-title>
		<template v-slot:extension>
			<v-breadcrumbs :items="tableItems" large>
				<template v-slot:divider>
					<v-icon>chevron_right</v-icon>
				</template>
			</v-breadcrumbs>
		</template>
	</v-toolbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DataModelHeader extends Vue {
	@Prop({ default: 'Data model', type: String }) private title!: [];
	@Prop({ type: Array, required: true }) private tableItems!: [];
}
</script>

<style lang="scss" scoped>
.disabled {
	color: black;
	pointer-events: none;
}
</style>
