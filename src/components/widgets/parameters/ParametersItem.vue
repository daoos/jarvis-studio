<template>
	<v-layout row>
		<v-flex xs3>
			<span class="subheading">{{ paramItem.label }}:</span>
			<v-tooltip right v-if="paramItem.description != undefined">
				<template v-slot:activator="{ on }">
					<v-icon small color="blue-grey lighten-5" dark v-on="on">info</v-icon>
				</template>
				<span>{{ paramItem.description }}</span>
			</v-tooltip>
		</v-flex>
		<v-flex xs9>
			<span class="subheading font-weight-bold" v-if="paramItem.value">{{
				paramItem.value
			}}</span>
			<span class="subheading font-weight-bold grey--text" v-else>{{
				paramItem.default
			}}</span>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	props: {
		paramItem: {
			type: Object,
			default() {
				return { id: "account", label: "Account", value: "000021" };
			}
		}
	}
};
</script>

<style lang="scss" scoped></style>
