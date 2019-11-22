<template>
	<v-card class="mb-3">
		<ParametersList
			:groupTitle="task.id"
			:tooltip="false"
			:paramItems="paramItemsTask"
			vflexLength="xs10"
			vflexOffset="offset-xs1"
		>
			<template v-slot:footer>
				<v-toolbar flat color="transparent">
					<v-spacer />

					<v-dialog
						v-model="dialogSql"
						max-width="1000"
						fullscreen
						v-if="task.task_type === 'sql'"
					>
						<template v-slot:activator="{ on }">
							<v-chip color="orange" text-color="white" v-on="on" class="mr-2">
								VIEW SQL
							</v-chip>
						</template>
						<v-card>
							<v-card-title class="headline grey lighten-2" primary-title>
								{{ task.id }}
							</v-card-title>

							<v-card-text>
								<prism
									:code="task.sql"
									:plugins="['line-numbers']"
									language="sql"
								></prism>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="primary" flat @click="dialogSql = false">
									Close
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-dialog
						v-model="dialogSchema"
						max-width="1000"
						fullscreen
						v-if="task.task_type === 'create_gbq_table'"
					>
						<template v-slot:activator="{ on }">
							<v-chip color="green" text-color="white" v-on="on" class="mr-2">
								VIEW SCHEMA
							</v-chip>
						</template>
						<v-card>
							<v-card-title class="headline grey lighten-2" primary-title>
								{{ task.id }}
							</v-card-title>

							<v-card-text>
								<tableSchemaView :schemaRows="task.bq_table_schema"
							/></v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="primary" flat @click="dialogSchema = false">
									Close
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-dialog v-model="dialogLongDescription" width="1000">
						<template v-slot:activator="{ on }">
							<v-chip color="primary" text-color="white" v-on="on">
								LONG DESCRIPTION
							</v-chip>
						</template>
						<v-card>
							<v-card-title class="headline grey lighten-2" primary-title>
								{{ task.id }}
							</v-card-title>

							<v-card-text>
								<vue-markdown :source="task.doc_md"></vue-markdown>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="primary"
									flat
									@click="dialogLongDescription = false"
								>
									Close
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
		</ParametersList>
	</v-card>
</template>

<script>
import ParametersList from "@/components/widgets/parameters/ParametersList.vue";
import VueMarkdown from "vue-markdown";
import Prism from "vue-prismjs";
import "prismjs/themes/prism.css";
import tableSchemaView from "@/components/widgets/configurations/TableSchemaView.vue";

export default {
	components: {
		ParametersList,
		VueMarkdown,
		Prism,
		tableSchemaView
	},
	props: {
		task: {
			type: Object,
			default() {
				return {
					doc_md:
						'# Executing task "SQL_PLE_PRP_Products.sql" **General description** To complete **STEP1** : To complete ',
					id: "products",
					short_description: "Load PDA products table",
					sql_file: "000010_Load_PSA_to_PDA_products.sql",
					table_name: "products",
					temporary_table: false
				};
			}
		},
		dagContext: {
			type: Object,
			default() {
				return {
					account: "000010",
					dag_dependencies: {
						activated: false
					},
					dag_name: "000010_load_bda_customer_reporting_performance",
					dag_type: "gbq-to-gbq",
					default_bq_dataset: "dlk_jules_pda",
					default_gcp_project_id: "fd-io-dlk-jules",
					default_write_disposition: "WRITE_TRUNCATE",
					doc_md: "000010_load_bda_customer_reporting_performance.md",
					schedule_interval: "0 6 * * *",
					short_description:
						"This DAG is designed to load BDA tables for UC Performance Reports",
					start_date: "2019, 6, 11",
					task_dependencies: [
						"sql_customer_list_stories >> sql_customer_list_uc >> sql_customer_list_uc_withreppop >> sql_customer_list_uc_withreppop_activity >> sql_customer_list_uc_withcomppop_activity >> sql_uc_agg_kpis"
					]
				};
			}
		}
	},
	data() {
		return {
			dialogLongDescription: false,
			dialogSql: false,
			dialogSchema: false
		};
	},
	computed: {
		paramItemsTask() {
			let communParams = [];
			communParams.push({
				id: "short_description",
				label: "Short Description",
				value: this.task.short_description,
				default: "Id of the Task",
				description: "Unique Id of the task in the dag "
			});
			communParams.push({
				id: "task_type",
				label: "Task Type",
				value: this.task.task_type,
				default: "SQL",
				description: "The type of the task (execute SQL or create Table"
			});
			if (this.task.task_type === "sql") {
				communParams.push({
					id: "gcp_project_id",
					label: "Table Project",
					value: this.task.gcp_project_id,
					default: this.dagContext.default_gcp_project_id,
					description:
						"Project of the destination table (surcharge the default project at the dag level configuration)"
				});
				communParams.push({
					id: "bq_dataset",
					label: "Table Dataset",
					value: this.task.bq_dataset,
					default: this.dagContext.default_bq_dataset,
					description:
						"Dataset of the destination table (surcharge the default dataset at the dag level configuration)"
				});
				communParams.push({
					id: "table_name",
					label: "Table Name",
					value: this.task.table_name,
					default: "my_table",
					description:
						"Name of the destination table generated by the SQL Query"
				});
				communParams.push({
					id: "temporary_table",
					label: "Temporary Table",
					value: this.task.temporary_table,
					default: "False",
					description:
						"Define if it's a temporary table that will be deleted at the end of the Dag"
				});
				communParams.push({
					id: "sql_file",
					label: "Name of the SQL File",
					value: this.task.sql_file,
					default: "my_sql_file.sql",
					description:
						"Name of the .sql file with the query generating the destination table"
				});
			}
			if (this.task.task_type === "copy_gbq_table") {
				communParams.push({
					id: "gcp_project_id",
					label: "Table Project",
					value: this.task.gcp_project_id,
					default: this.dagContext.default_gcp_project_id,
					description:
						"Project of the destination table (surcharge the default project at the dag level configuration)"
				});
				communParams.push({
					id: "bq_dataset",
					label: "Table Dataset",
					value: this.task.bq_dataset,
					default: this.dagContext.default_bq_dataset,
					description:
						"Dataset of the destination table (surcharge the default dataset at the dag level configuration)"
				});
				communParams.push({
					id: "destination_bq_table",
					label: "Destination table Name",
					value: this.task.destination_bq_table,
					default: "my_table",
					description: "Name of the destination table copied from source table"
				});
				communParams.push({
					id: "destination_bq_table_date_suffix",
					label: "Add Date suffix to destination table",
					value: this.task.destination_bq_table_date_suffix,
					default: "False",
					description:
						"Add the current date as a suffix to the destination table"
				});
				communParams.push({
					id: "destination_bq_table_date_suffix_format",
					label: "Date suffix format",
					value: this.task.destination_bq_table_date_suffix_format,
					default: "%Y%m%d",
					description: "Format of the destination table date Suffix"
				});
			}
			return communParams;
		}
	}
};
</script>

<style lang="scss" scoped></style>
