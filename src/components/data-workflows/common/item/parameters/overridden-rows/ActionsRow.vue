<template>
	<div>
		<v-btn color="primary" @click="showDetailsDialog = true">View details</v-btn>

		<v-dialog v-model="showDetailsDialog" max-width="65%">
			<v-card>
				<v-card-title class="headline">Details</v-card-title>

				<v-card-text>
					<v-tabs v-model="tab" color="black" background-color="#E0E0E0" slider-color="primary" class="elevation-1">
						<v-tab v-for="tab in tabs" :key="tab.href" :href="`#${tab.href}`">{{ tab.label }}</v-tab>

						<v-tab-item value="schema">
							<v-card flat tile>
								<v-card-text>Schema content</v-card-text>
							</v-card>
						</v-tab-item>

						<v-tab-item value="parameters">
							<v-card flat tile>
								<v-card-text>Parameters content</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs>
				</v-card-text>

				<v-card-actions>
					<v-spacer />
					<v-btn color="green darken-1" text @click="showDetailsDialog = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ActionsRow extends Vue {
	showDetailsDialog: boolean = false;
	tab: null = null;
	get tabs(): Object[] {
		return [
			{
				label: 'schema',
				href: 'schema'
			},
			{
				label: 'parameters',
				href: 'parameters'
			}
		];
	}
}
</script>
