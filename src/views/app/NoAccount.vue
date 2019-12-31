<template>
	<v-container class="fill-height text-center">
		<v-row align="center">
			<v-col>
				<h1 class="display-2 primary--text mb-4">Whoops...</h1>

				<p class="ma-0">It looks like you don't have any account set on your profile.</p>
				<p>Please contact your admin.</p>
			</v-col>
		</v-row>

		<v-btn fab bottom right color="blue" dark fixed @click="logoutUser">
			<v-icon>logout</v-icon>
		</v-btn>
	</v-container>
</template>

<script>
import { LOGOUT } from '@/constants/router/routes-names';

export default {
	name: 'no-account',
	methods: {
		logoutUser() {
			this.$router.push({ name: LOGOUT });
		}
	}
};
</script>
