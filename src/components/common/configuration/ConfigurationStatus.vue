<template>
	<div>
		<v-chip
			:color="colorActivatedConfStatus"
			text-color="white"
			:small="isSmall"
			:class="chipTextClass"
			:label="isLabel"
			@click="changeActivatedStatus(item, collection)"
		>
			<v-progress-circular indeterminate size="20" color="primary" v-if="isLoading" />
			<span v-else>{{ labelActivatedConfStatus }}</span>
		</v-chip>

		<v-snackbar v-model="snackbarParam.show" :color="snackbarParam.color" :timeout="timeout">
			{{ snackbarParam.message }}
			<v-btn text @click="closeSnackbar">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script>
import store from '@/store';
import { getActiveConfColor, getActiveConfLabel } from '@/util/data-workflows/configuration';

export default {
	name: 'activated-status-chip',
	props: {
		item: {
			type: Object,
			required: true
		},
		collection: {
			type: String,
			required: true
		},
		activatedConfStatus: {
			type: Boolean,
			default: undefined
		},
		isSmall: {
			type: Boolean,
			default: true
		},
		isLabel: {
			type: Boolean,
			default: false
		},
		chipTextClass: {
			type: String,
			default: 'text-capitalize'
		}
	},
	data: () => ({
		isLoading: false,
		snackbarParam: {},
		alertParam: {}
	}),
	methods: {
		changeActivatedStatus(item, collection) {
			this.isLoading = true;

			this.snackbarParam = {
				message: null,
				show: false,
				color: null
			};

			const id = item.id;
			const collectionPath = ''.concat(collection, '/patch');

			switch (item.activated) {
				case true:
					store.dispatch(collectionPath, { id, activated: false }).then(() => {
						this.statusUpdateCallback({
							message: 'Configuration disabled',
							show: true,
							color: getActiveConfColor(false)
						});
					});
					break;
				case false:
					store.dispatch(collectionPath, { id, activated: true }).then(() => {
						this.statusUpdateCallback({
							message: 'Configuration activated',
							show: true,
							color: getActiveConfColor(true)
						});
					});
					break;
				default:
					this.$emit('statusError', {
						message:
							'The Activated attribute is not well set in the source configuration. Please update and deploy it again',
						show: true,
						color: 'error',
						icon: 'error',
						dismissible: true
					});
					this.isLoading = false;
					break;
			}
		},
		statusUpdateCallback(snackbarParams) {
			this.snackbarParam = snackbarParams;
			this.isLoading = false;
		},
		closeSnackbar() {
			this.snackbarParam.show = false;
		}
	},
	computed: {
		colorActivatedConfStatus() {
			return getActiveConfColor(this.activatedConfStatus);
		},
		labelActivatedConfStatus() {
			return getActiveConfLabel(this.activatedConfStatus);
		},
		timeout: () => 3500
	}
};
</script>
