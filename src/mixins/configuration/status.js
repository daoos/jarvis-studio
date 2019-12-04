export default {
	data: () => ({
		snackbarParam: {},
		alertParam: {}
	}),
	methods: {
		onStatusUpdate(params) {
			this.snackbarParam = params;
			console.log('STATUS UPDATED -> Show Snackbar', params);
		},
		onStatusError(params) {
			this.alertParam = params;
			console.log('STATUS UPDATED -> Show Alert', params);
		}
	}
};
