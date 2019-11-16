<template>
	<v-container>
		<FiltersMenu></FiltersMenu>
		<v-row class="text-center">
			<v-col cols="12">
				<BarChart
					:chartData="chartData"
					:chartOptions="chartOptions"
					height="150"
				/>
			</v-col>
			<v-col cols="12">
				<v-img
					:src="require('../assets/logo.svg')"
					class="my-3"
					contain
					height="200"
				></v-img>
			</v-col>

			<v-col class="mb-4">
				<h1 class="display-2 font-weight-bold mb-3">
					Welcome to Vuetify
				</h1>
				<p class="subheading font-weight-regular">
					For help and collaboration with other Vuetify developers,
					<br />please join our online
					<a href="https://community.vuetifyjs.com" target="_blank"
						>Discord Community</a
					>
				</p>
			</v-col>

			<v-col class="mb-5" cols="12">
				<h2 class="headline font-weight-bold mb-3">What's next?</h2>

				<v-row justify="center">
					<a
						v-for="(next, i) in whatsNext"
						:key="i"
						:href="next.href"
						class="subheading mx-3"
						target="_blank"
					>
						{{ next.text }}
					</a>
				</v-row>
			</v-col>

			<v-col class="mb-5" cols="12">
				<h2 class="headline font-weight-bold mb-3">Important Links</h2>

				<v-row justify="center">
					<a
						v-for="(link, i) in importantLinks"
						:key="i"
						:href="link.href"
						class="subheading mx-3"
						target="_blank"
					>
						{{ link.text }}
					</a>
				</v-row>
			</v-col>

			<v-col class="mb-5" cols="12">
				<h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

				<v-row justify="center">
					<a
						v-for="(eco, i) in ecosystem"
						:key="i"
						:href="eco.href"
						class="subheading mx-3"
						target="_blank"
					>
						{{ eco.text }}
					</a>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import BarChart from "./widgets/charts/BarChart.js";
import FiltersMenu from "./widgets/filters/FiltersMenu.vue";

export default {
	components: {
		BarChart,
		FiltersMenu
	},
	data: () => ({
		chartData: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
				{
					label: "Data One",
					backgroundColor: "#FC2525",
					data: [40, 39, 10, 40, 39, 80, 40]
				},
				{
					label: "Data Two",
					backgroundColor: "#05CBE1",
					data: [60, 55, 32, 10, 2, 12, 53]
				}
			]
		},
		chartOptions: { responsive: true, maintainAspectRatio: false }
	})
};
</script>

<style></style>
