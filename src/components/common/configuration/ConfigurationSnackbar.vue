<template>
	<v-snackbar v-model="showSnackbar" :color="color" :timeout="3500">
		{{ msg }}
		<v-btn text @click="closeSnackbar">Close</v-btn>
	</v-snackbar>
</template>

<script>
export default {
	name: 'configuration-snackbar',
	props: {
		showSnackbar: {
			type: Boolean,
			default: false,
			required: true
		},
		color: {
			type: String,
			default: 'complementary'
		},
		msg: {
			type: String
		}
	},
	data: () => ({
		vModel: null
	}),
	methods: {
		closeSnackbar() {
			this.$emit('closeSnackbar');
		}
	},
	watch: {
		showSnackbar(value) {
			console.log(value);
			this.vModel = value;
		}
	}
};
</script>
