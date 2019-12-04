export default {
	data: () => ({
		snackbarParam: {},
		alertParam: {}
	}),
	methods: {
		onStatusUpdate(params) {
			this.snackbarParam = params;
		},
		onStatusError(params) {
			this.alertParam = params;
		},
		onCloseSnackbar() {
			this.snackbarParam.show = false;
		}
	}
};
