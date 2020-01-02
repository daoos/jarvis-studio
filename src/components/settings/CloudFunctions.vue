<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<v-card dark>
					<v-card-text>
						<vue-json-pretty
							:data="moduleJson"
							:deep="2"
							:show-double-quotes="true"
							:show-length="true"
							:show-line="false"
						>
						</vue-json-pretty>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import store from '@/store';

export default {
	name: 'cloud-functions',
	components: {
		VueJsonPretty
	},
	created() {
		//load the content of the module
		store.dispatch('gcpcloudfunctions/fetchAndAdd').catch(console.error);
	},
	computed: {
		moduleJson() {
			return store.state.gcpcloudfunctions.data;
		}
	}
};
</script>
