<template>
	<v-avatar color="red" size="36">
		<!-- TODO: Add user img -->
		<span v-if="initials" class="white--text">{{ initials }}</span>
		<v-icon v-else dark>account_circle</v-icon>
	</v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AvatarComponent extends Vue {
	// TODO: Replace with UserSocialInfo
	@Prop() email!: string;

	get initials() {
		const splitedEmail = this.email.split('.');

		console.log(splitedEmail.length);
		if (splitedEmail.length === 1) return null;
		return `${splitedEmail[0].charAt(0)}${splitedEmail[1].charAt(0)}`.toUpperCase();
	}
}
</script>
