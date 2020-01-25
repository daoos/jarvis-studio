import { Component, Vue } from 'vue-property-decorator';
import { STATUS } from '@/constants/data-workflows/status';

@Component
export default class StatusCollectionMixin extends Vue {
	get listingType() {
		return STATUS;
	}
}
