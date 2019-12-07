<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<template v-for="(item, index) in data">
					<component
						v-if="!item.hasOwnProperty('displayCondition') || item.displayCondition"
						:key="`${item.component}-${index}`"
						:is="item.component"
						:properties="item.props"
					/>
				</template>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ViewHeader from './ViewHeader';
import ParametersList from '../../common/parameters/ParametersList';
import ParametersTable from '../../common/parameters/ParametersTable';

export default {
	name: 'overview-component',
	components: { ViewHeader, ParametersList, ParametersTable },
	props: {
		data: {
			type: Array,
			required: true
		}
	}
};
</script>
