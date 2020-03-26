<template>
	<div>
		<v-progress-linear v-if="isLoading" color="primary" indeterminate />

		<v-treeview
			v-else
			:items="models"
			:open.sync="open"
			:active.sync="active"
			active-class="primary--text"
			class="transparent"
			open-on-click
			transition
			activatable
			dense
		>
			<template v-slot:label="{ item, active }">
				<v-icon v-if="!item.children" :color="active ? 'primary' : ''" dense>table_chart</v-icon>
				<span class="name">{{ item.name }}</span>
			</template>
		</v-treeview>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { HOME, TABLES_LISTING } from '@/constants/router/routes-names';
import { mapState } from 'vuex';

interface TreeItem {
	id: string;
	name: string;
	children?: TreeItem[];
}

@Component({
	computed: {
		...mapState({
			dataModels: (state: any) => state.dataModels.data
		})
	}
})
export default class TreeView extends Vue {
	private dataModels: any;

	active: string[] = [];
	open: string[] = [];
	models: TreeItem[] = [];
	isLoading: boolean = true;

	@Watch('active')
	onActiveChange(value: string[]) {
		if (!value.length) {
			this.$router.push({ name: HOME });
			return;
		}

		const id = value[0];
		this.$router.push({
			name: TABLES_LISTING,
			params: { projectId: id.split('/')[0], datasetId: id.split('/')[1] }
		});
	}

	mounted() {
		this.getDataModel();
	}

	getDataModel() {
		this.$store.dispatch('dataModels/fetchAndAdd', { limit: 0 }).then(() => {
			const dataModels = Object.values(this.dataModels);
			this.models = dataModels.map(
				(data: any): TreeItem => {
					let children: TreeItem[] = [];

					data.sub_collections.forEach((dataset: string) =>
						children.push({ id: `${data.id}/${dataset}`, name: dataset })
					);

					return { id: data.id, name: data.id, children };
				}
			);

			this.isLoading = false;
		});
	}
}
</script>

<style lang="scss">
.name {
	font-size: 0.8125rem;
}
</style>
