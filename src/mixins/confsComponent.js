import store from '@/store/index';
import Util from '@/util';

export default {
	data: () => ({
		snackbarParam: { message: '', show: false, color: 'info' },
		alertParam: { message: '', show: false, color: 'info', dismissible: true }
	}),
	methods: {
		changeActivatedStatus(item, collection) {
			//init snackbar
			this.snackbarParam.message = '';
			this.snackbarParam.show = false;
			this.snackbarParam.color = 'info';
			//init alert bar
			this.alertParam.message = '';
			this.alertParam.show = false;
			this.alertParam.color = 'info';
			// The id of the conf to update
			let id = item.id;
			// The path of the collection the item belong to
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
	}
};
