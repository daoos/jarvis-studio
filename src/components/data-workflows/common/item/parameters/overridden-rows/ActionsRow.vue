<template>
	<div>
		<v-btn color="primary" @click="showDetailsDialog = true">View details</v-btn>

		<v-dialog v-model="showDetailsDialog" max-width="65%">
			<v-card>
				<v-card-title class="headline">Details</v-card-title>

				<v-card-text>
					<v-tabs v-model="tab" color="black" background-color="#E0E0E0" slider-color="primary" class="elevation-1">
						<v-tab v-for="tab in tabs" :key="tab.href" :href="`#${tab.href}`">{{ tab.label }}</v-tab>

						<v-tab-item :value="getTabHref(0)">
							<v-card flat tile>
								<v-card-text>
									<vue-good-table :columns="schemaColumns" :rows="schema" styleClass="vgt-table striped condensed" />
								</v-card-text>
							</v-card>
						</v-tab-item>

						<v-tab-item :value="getTabHref(1)">
							<v-card flat tile>
								<v-card-text>
									<view-json :json="parametersJson" />
								</v-card-text>
							</v-card>
						</v-tab-item>

						<v-tab-item :value="getTabHref(2)">
							<v-card flat tile>
								<v-card-text>
									<vue-markdown :source="docMdDecoded" />
								</v-card-text>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject, TableParameters } from '@/types';
import { Base64 } from 'js-base64';
import ViewJson from '@/components/data-workflows/common/item/json/ViewJson.vue';
import VueGoodTable from 'vue-good-table';
import VueMarkdown from 'vue-markdown';

@Component({
	components: {
		ViewJson,
		VueGoodTable,
		VueMarkdown
	}
})
export default class ActionsRow extends Vue {
	@Prop({ required: true }) item!: AnyObject;
	@Prop({ required: true }) index!: number;

	showDetailsDialog: boolean = false;
	tab: null = null;

	getTabHref(index: number) {
		return this.tabs[index].href;
	}

	get tabs(): { label: string; href: string }[] {
		return [
			{
				label: 'schema',
				href: 'schema'
			},
			{
				label: 'parameters',
				href: 'parameters'
			},
			{
				label: 'documentation',
				href: 'documentation'
			}
		];
	}

	get destinationTable(): AnyObject {
		return this.item.configuration_context.destinations[0].tables[this.index];
	}

	get schemaColumns(): Object[] {
		return [
			{
				label: 'name',
				field: 'name',
				type: 'string'
			},
			{
				label: 'type',
				field: 'type',
				type: 'string'
			},
			{
				label: 'description',
				field: 'description',
				type: 'string'
			}
		];
	}

	get schema(): Object[] {
		return JSON.parse(Base64.decode(this.destinationTable.ddl_infos)).schema;
	}

	get parametersJson(): Object {
		const destination = this.item.configuration_context.destinations[0];
		const parameters: TableParameters = {
			source_format: destination.source_format,
			create_disposition: destination.create_disposition,
			write_disposition: destination.write_disposition,
			skip_leading_rows: destination.skip_leading_rows,
			field_delimiter: destination.field_delimiter,
			quote_character: destination.quote_character,
			null_marker: destination.null_marker,
			bq_load_job_ignore_unknown_values: destination.bq_load_job_ignore_unknown_values,
			bq_load_job_max_bad_records: destination.bq_load_job_max_bad_records,
			bq_load_job_schema_update_options: destination.bq_load_job_schema_update_options,
			bq_load_job_allow_quoted_newlines: destination.bq_load_job_allow_quoted_newlines,
			bq_load_job_allow_jagged_rows: destination.bq_load_job_allow_jagged_rows
		};

		Object.keys(parameters).forEach(key => (parameters[key] === undefined ? delete parameters[key] : {}));

		return parameters;
	}

	get docMdDecoded(): string {
		return this.destinationTable.doc_md ? Base64.decode(this.destinationTable.doc_md) : '/';
	}
}
</script>
