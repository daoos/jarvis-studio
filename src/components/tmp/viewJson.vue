<template>
	<v-container>
		<v-row class="pl-5 pt-4 pr-5">
			<v-col cols="12" offset="0">
				<span class="headline font-weight-bold">{{ jsonID }}</span>

				<v-row class="pt-4 pb-4">
					<vue-json-pretty
						:data="json"
						:deep="deep"
						:show-double-quotes="true"
						:show-length="true"
						:show-line="false"
					/>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';

export default {
	components: {
		VueJsonPretty
	},
	props: {
		json: {
			type: Object,
			default: undefined
		},
		jsonID: {
			type: String,
			default: 'Json Doc ID'
		},
		deep: {
			type: Number,
			default: 5
		}
	}
};
</script>
