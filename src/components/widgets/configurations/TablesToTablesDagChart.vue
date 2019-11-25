<template>
	<perfect-scrollbar>
		<VueFlowy :chart="chart"></VueFlowy>
	</perfect-scrollbar>
</template>

<script>
import { VueFlowy, FlowChart } from 'vue-flowy';
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';

export default {
	name: 'App',

	components: {
		VueFlowy,
		PerfectScrollbar
	},
	props: {
		dagId: {
			type: String,
			default: 'jarvisDag'
		},
		task_dependencies: {
			type: Array,
			default() {
				return [
					'sql_bda_ple_prp_products>>[sql_bda_ple_prp_sales, sql_bda_ple_prp_stocks, sql_bda_ple_prp_pdg]',
					'sql_bda_ple_prp_stores>>sql_bda_ple_prp_web>>sql_bda_ple_prp_margin'
				];
			}
		}
	},

	data: () => ({
		chart: new FlowChart()
	}),
	mounted() {
		this.buildDegGraph();
	},
	beforeDestroy() {
		this.chart.destroy();
	},
	methods: {
		buildDegGraph() {
			this.chart.destroy();
			this.chart = new FlowChart({ direction: 'LR' });
			let start = this.chart.addElement(this.dagId.concat('-start'), {
				label: 'Start'
			});
			let end = this.chart.addElement(this.dagId.concat('-end'), {
				label: 'End'
			});
			let i;
			let j;
			let k;
			let m;

			for (i = 0; i < this.dag.length; i++) {
				let tasksArray = this.dag[i].split('>>');
				let dagBranch = [];
				for (j = 0; j < tasksArray.length; j++) {
					if (tasksArray[j].indexOf('[') == 0) {
						let dagParall = [];
						let taskParallArray = tasksArray[j]
							.replace('[', '')
							.replace(']', '')
							.split(',');
						for (k = 0; k < taskParallArray.length; k++) {
							dagParall.push(
								this.chart.addElement(k.toString().concat('-', j, '-', i, ':', taskParallArray[k]), {
									label: taskParallArray[k]
								})
							);
						}
						dagBranch.push(dagParall);
						if (j > 0) {
							let previous = j - 1;
							if (Array.isArray(dagBranch[previous])) {
								let l;
								for (l = 0; l < dagBranch[previous].length; l++) {
									for (k = 0; k < dagParall.length; k++) {
										dagBranch[previous][l].leadsTo(dagParall[k]);
									}
								}
							} else {
								for (k = 0; k < dagParall.length; k++) {
									dagBranch[previous].leadsTo(dagParall[k]);
								}
							}
						}
					} else {
						dagBranch.push(
							this.chart.addElement(j.toString().concat('-', i, ':', tasksArray[j]), {
								label: tasksArray[j]
							})
						);
						if (j > 0) {
							let previous = j - 1;
							if (Array.isArray(dagBranch[previous])) {
								let l;
								for (l = 0; l < dagBranch[previous].length; l++) {
									dagBranch[previous][l].leadsTo(dagBranch[j]);
								}
							} else {
								dagBranch[previous].leadsTo(dagBranch[j]);
							}
						}
					}
				}
				if (Array.isArray(dagBranch[0])) {
					for (m = 0; m < dagBranch[0].length; m++) {
						start.leadsTo(dagBranch[0][m]);
					}
				} else {
					start.leadsTo(dagBranch[0]);
				}
				if (Array.isArray(dagBranch[dagBranch.length - 1])) {
					for (m = 0; m < dagBranch[dagBranch.length - 1].length; m++) {
						dagBranch[dagBranch.length - 1][m].leadsTo(end);
					}
				} else {
					dagBranch[dagBranch.length - 1].leadsTo(end);
				}
			}

			// start.on("click", function() {
			//   console.log("click!");
			// });
		}
	},
	computed: {
		dag() {
			let dag = [];
			let i;
			for (i = 0; i < this.task_dependencies.length; i++) {
				dag.push(this.task_dependencies[i].replace(/ /g, ''));
			}
			return dag;
		}
	}
};
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css" />
