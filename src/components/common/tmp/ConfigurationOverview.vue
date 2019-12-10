<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<template v-for="(item, index) in data">
					<component
						v-if="!item.hasOwnProperty('displayCondition') || item.displayCondition"
						:key="`${item.component}-${index}`"
						:is="item.component"
						v-bind="item.props"
					/>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import OverviewComponent from '@/components/data-workflows/common/OverviewComponent';
import ParametersList from '../parameters/ParametersList';
import ParametersTable from '../parameters/ParametersTable';

export default {
	name: 'gbq-to-gcs-configuration-overview',
	components: { OverviewComponent, ParametersList, ParametersTable },
	props: {
		data: { type: Array, required: true }
	}
};
</script>
