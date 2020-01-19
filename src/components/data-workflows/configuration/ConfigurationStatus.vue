<template>
	<div>
		<v-chip
			:color="color"
			text-color="white"
			:small="isSmall"
			:class="{
				'text-uppercase': isLabel,
				'text-capitalize': !isLabel,
				'no-opacity': this.item.archive
			}"
			:label="isLabel"
			:disabled="item.archive"
			@click="changeActivatedStatus(item, collection)"
		>
			<v-progress-circular indeterminate size="20" color="primary" v-if="isLoading" />
			<span v-else>{{ label }}</span>
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
		isActivated: {
			type: Boolean
		},
		isSmall: {
			type: Boolean,
			default: true
		},
		isLabel: {
			type: Boolean,
			default: false
		},
		customKey: {
			type: String,
			default: null
		}
	},
	data: () => ({
		isLoading: false,
		snackbarParam: {},
		alertParam: {}
	}),
	methods: {
		changeActivatedStatus(item, collection) {
			if (this.isActivated === undefined) {
				this.statusUpdateCallback({
					message:
						'The Activated attribute is not well set in the source configuration. Please update and deploy it again',
					show: true,
					color: 'error'
				});

				return;
			}

			this.isLoading = true;
			this.snackbarParam = {
				message: null,
				show: false,
				color: null
			};
			const id = item.id;
			const collectionPath = `${collection}/patch`;

			let activated, message;

			if (this.isActivated) {
				activated = false;
				message = 'Configuration disabled';
			} else {
				activated = true;
				message = 'Configuration activated';
			}

			const payload = this.customKey ? { id, [this.customKey]: { activated } } : { id, activated };

			store.dispatch(collectionPath, payload).then(() => {
				this.statusUpdateCallback({ message: message, show: true, color: getActiveConfColor(activated) });
			});
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
		color() {
			return getActiveConfColor(this.isActivated, this.item.archive);
		},
		label() {
			return getActiveConfLabel(this.isActivated);
		},
		timeout: () => 3500
	}
};
</script>

<style lang="scss">
.v-chip.no-opacity {
	opacity: 1;
}
</style>
