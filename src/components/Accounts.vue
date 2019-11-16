<template>
	<v-container grid-list-xl>
		<h1>Accounts:</h1>
		<v-data-table :headers="headers" :items="accounts" class="elevation-1">
			<template v-slot:items="props">
				<td>{{ props.item["account_name"] }}</td>
				<td>{{ props.item["id"] }}</td>
				<td>{{ props.item["dlk_gcp_id_project"] }}</td>
				<td>{{ props.item["exc_gcp_id_project"] }}</td>
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="error" icon="warning">
					Sorry, nothing to display here :(
				</v-alert>
			</template>
		</v-data-table>
		<v-row>
			<v-col cols="12" offset="0">
				<v-card dark>
					<v-card-text>
						<vue-json-pretty
							:data="accounts"
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
		<v-dialog v-model="dialog" width="800px">
			<v-card>
				<v-card-title class="black lighten-4 py-4 title">
					Create Account
				</v-card-title>
				<v-container grid-list-sm class="pa-4">
					<v-row>
						<v-col cols="6">
							<v-text-field
								prepend-icon="business"
								placeholder="Account Name"
							></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-text-field
								prepend-icon="vpn_key"
								placeholder="Account ID"
							></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-text-field
								prepend-icon="account_box"
								placeholder="Contact First Name"
							></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-text-field placeholder="Contact Last Name"></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field
								prepend-icon="mail"
								placeholder="Email Contact Account"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<v-text-field
								prepend-icon="notes"
								placeholder="Notes"
							></v-text-field>
						</v-col>
					</v-row>
				</v-container>
				<v-card-actions>
					<v-btn flat color="primary">More</v-btn>
					<v-spacer></v-spacer>
					<v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
					<v-btn flat @click="dialog = false">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";

export default {
	components: {
		VueJsonPretty
	},
	data: () => ({
		dialog: false,
		headers: [
			{
				text: "Account Name",
				align: "left",
				sortable: true,
				value: "account_name"
			},
			{
				text: "Account ID",
				align: "left",
				sortable: true,
				value: "id"
			},
			{
				text: "Dlk Project ID",
				align: "left",
				sortable: true,
				value: "dlk_gcp_id_project"
			},
			{
				text: "Exchange Project ID",
				align: "left",
				sortable: true,
				value: "exc_gcp_id_project"
			}
		]
	}),
	created() {
		//load the content of the module
		store.dispatch("accounts/fetchAndAdd").catch(console.error);
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user
		}),
		accounts() {
			console.log("store.state.accounts.data");
			console.log(store.state.accounts.data);
			console.log(Object.values(store.state.accounts.data));
			return Object.values(store.state.accounts.data);
		}
	}
};
</script>

<style></style>
