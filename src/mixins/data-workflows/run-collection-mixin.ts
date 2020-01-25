import { Component, Vue } from 'vue-property-decorator';
import { RUNS } from '@/constants/data-workflows/status';

@Component
export default class RunCollectionMixin extends Vue {
	get listingType() {
		return RUNS;
	}
}
