// TODO: Create common mixin & import components

import { Component, Vue } from 'vue-property-decorator';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';

@Component
export default class ConfigurationCollectionMixin extends Vue {
	get listingType() {
		return CONFIGURATIONS;
	}
}
