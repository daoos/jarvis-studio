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
	@Prop(String) email!: string;

	get initials() {
		if (!this.email) return '';

		const emailSplit = this.email.split('.');
		if (emailSplit.length === 1) return null;
		return `${emailSplit[0].charAt(0)}${emailSplit[1].charAt(0)}`.toUpperCase();
	}
}
</script>
