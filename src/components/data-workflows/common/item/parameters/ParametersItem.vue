<template>
	<v-row>
		<v-col cols="3">
			<span class="subheading">{{ paramItem.label }}:</span>

			<v-tooltip right v-if="paramItem.description != undefined">
				<template v-slot:activator="{ on }">
					<v-icon small color="blue-grey lighten-5" dark v-on="on">info</v-icon>
				</template>
				<span>{{ paramItem.description }}</span>
			</v-tooltip>
		</v-col>

		<v-col cols="9">
			<template v-if="paramItem.component">
				<component :is="paramItem.component" :properties="paramItem.properties" />
			</template>

			<template v-else>
				<span class="subheading font-weight-bold" v-if="paramItem.value">{{ paramItem.value }}</span>
				<span class="subheading font-weight-bold grey--text" v-else>{{ paramItem.default }}</span>
			</template>
		</v-col>
	</v-row>
</template>

<script>
import SqlViewer from '@/components/data-workflows/common/SqlViewer';

export default {
	name: 'parameters-item',
	components: { SqlViewer },
	props: {
		paramItem: {
			type: Object,
			default() {
				return { id: 'account', label: 'Account', value: '000021' };
			}
		}
	}
};
</script>
