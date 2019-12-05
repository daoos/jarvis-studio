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
		closeSnackbar() {
			this.snackbarParam.show = false;
		}
	},
	computed: {
		timeout: () => 3500
	}
};
