<template>
	<v-toolbar dense tabs color="primary" dark>
		<v-toolbar-title class="pl-2 display-1">Data Model</v-toolbar-title>
		<template v-slot:extension>
			<v-breadcrumbs :items="tableItems" dark large>
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
	@Prop({ required: true }) private tableItems!: [];
}
</script>

<style lang="scss" scoped>
.disabled {
	color: black;
	pointer-events: none;
}
</style>
