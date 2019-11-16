<template>
	<v-container grid-list-xl>
		<v-layout row pl-5 pt-4 pr-5>
			<v-flex xs12 offset-xs0>
				<span class="headline font-weight-bold">{{ jsonID }}</span>
				<v-layout row pt-4 pb-4>
					<vue-json-pretty
						:data="json"
						:deep="deep"
						:show-double-quotes="true"
						:show-length="true"
						:show-line="false"
					>
					</vue-json-pretty>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";

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
			default: "Json Doc ID"
		},
		deep: {
			type: Number,
			default: 5
		}
	}
};
</script>

<style lang="scss" scoped></style>
