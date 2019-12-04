<template>
	<v-chip
		:color="colorActivatedConfStatus"
		text-color="white"
		:small="smallChip"
		:class="chipTextClass"
		:label="chipLabel"
		@click="changeActivatedStatus(item, collection)"
	>
		{{ labelActivatedConfStatus }}
	</v-chip>
</template>

<script>
import ConfsComponent from '@/mixins/confsComponent';

import Util from '@/util';
import store from '@/store';
import { getActiveConfColor, getActiveConfLabel } from '@/util/data-workflows/configuration';

export default {
	name: 'activated-status-chip',
	mixins: [ConfsComponent],
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
		smallChip: {
			type: Boolean,
			default: true
		},
		chipLabel: {
			type: Boolean,
			default: false
		},
		chipTextClass: {
			type: String,
			default: 'text-capitalize'
		}
	},
	methods: {
		changeActivatedStatus(item, collection) {
			this.snackbarParam.message = '';
			this.snackbarParam.show = false;
			this.snackbarParam.color = 'info';

			this.alertParam.message = '';
			this.alertParam.show = false;
			this.alertParam.color = 'info';

			const id = item.id;
			const collectionPath = ''.concat(collection, '/patch');

			switch (item.activated) {
				case true:
					this.snackbarParam.message = 'Configuration disabled';
					this.snackbarParam.color = Util.getActiveConfColor(false);
					store.dispatch(collectionPath, { id, activated: false }).then((this.snackbarParam.show = true));
					break;
				case false:
					this.snackbarParam.message = 'Configuration activated';
					this.snackbarParam.color = Util.getActiveConfColor(true);
					store.dispatch(collectionPath, { id, activated: true }).then((this.snackbarParam.show = true));
					break;
				default:
					this.alertParam.color = 'error';
					this.alertParam.message =
						'The Activated attribute is not well set in the source configuration. Please update and deploy it again';
					this.alertParam.show = 'true';
					this.alertParam.icon = 'error';
					break;
			}
		}
	},
	computed: {
		colorActivatedConfStatus() {
			return getActiveConfColor(this.activatedConfStatus);
		},
		labelActivatedConfStatus() {
			return getActiveConfLabel(this.activatedConfStatus);
		}
	}
};
</script>
