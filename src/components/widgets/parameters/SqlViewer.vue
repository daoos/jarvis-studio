<template>
	<v-dialog v-model="showDialog" max-width="1000" fullscreen>
		<template v-slot:activator="{ on }">
			<v-chip color="orange" text-color="white" v-on="on" class="mr-2">VIEW SQL</v-chip>
		</template>

		<v-card>
			<v-card-title class="headline grey lighten-2" primary-title>
				<!--{{ task.id }}-->
				<p>Title</p>
			</v-card-title>

			<v-card-text>
				<p>text</p>
				<pre>{{ properties.sqlBinary }}</pre>
				<!-- <prism :code="properties.sqlBinary" :plugins="['line-numbers']" language="sql" /> -->
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn color="primary" text @click="closeDialog">Close</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'sql-viewer',
	props: {
		properties: Object
	},
	data: () => ({
		showDialog: false
	}),
	methods: {
		closeDialog() {
			this.showDialog = false;
		}
	}
};
</script>
