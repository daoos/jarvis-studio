<template>
	<div>
		<v-toolbar dense color="primary" dark extended extension-height="300" text>
			<v-toolbar-title class="mx-auto" slot="extension">
				<h2>Welcome to Jarvis Studio</h2>
				<span>Keep Calm and Ask for the Retail Data Butler.</span>
			</v-toolbar-title>
		</v-toolbar>

		<v-container>
			<v-row>
				<v-col cols="12" md="8" offset-md="2">
					<v-container fluid>
						<v-row>
							<v-col cols="12" sm="6" md="6" lg="6" v-for="item in links" :key="item.id">
								<v-hover>
									<v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2} rounded-card`">
										<v-img src="" aspect-ratio="2.75" height="25px" :class="item.color"></v-img>

										<v-card-title primary-title>
											<div>
												<h3 class="headline mb-0">{{ item.title }}</h3>
												<p class="mb-0 subtitle-1">{{ item.description }}</p>
											</div>
										</v-card-title>

										<v-card-actions>
											<v-btn text color="primary" class="learn-more-btn">
												Learn more
											</v-btn>
											<v-spacer></v-spacer>
											<v-btn text color="primary">Get started</v-btn>
										</v-card-actions>
									</v-card>
								</v-hover>
							</v-col>
						</v-row>
					</v-container>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'home-view',
	data() {
		return {
			links: [
				{
					id: '1',
					title: 'Data Models',
					description: 'Get fast and detailed overview on all datasets and tables managed by Jarvis',
					color: 'orange'
				},
				{
					id: '2',
					title: 'Data Workflows',
					description: 'Monitor data workflows executions, check configurations and execute jobs.',
					color: 'teal'
				},
				{
					id: '3',
					title: 'Data Quality',
					description: 'Supervise data quality with simple tSQL queries and maintaining a high quality of information',
					color: 'blue'
				},
				{
					id: '4',
					title: 'Data Visualization',
					description: 'Access to Data Visualizations and Dashboards built on the top of the Data available in Jarvis',
					color: 'purple'
				}
			]
		};
	}
};
</script>

<style scoped>
.outine-2 {
	border: 2px solid white;
}
.card--flex-toolbar {
	margin-top: -90px;
}
.learn-more-btn {
	text-transform: initial;
	text-decoration: underline;
}
.rounded-card {
	border-radius: 5px;
}
</style>
