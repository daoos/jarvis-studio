<template>
	<v-avatar color="contrast" :size="avatarSize">
		<img v-if="user.photoURL" :src="user.photoURL" alt="Avatar" />
		<span v-else class="white--text">{{ initials }}</span>
	</v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/types';

@Component
export default class AvatarComponent extends Vue {
	@Prop({ type: Object, required: true }) user!: User;
	@Prop(String) size?: 'small' | 'x-large';

	get avatarSize(): number {
		switch (this.size) {
			case 'small':
				return 36;

			case 'x-large':
				return 180;

			default:
				return 36;
		}
	}

	get initials() {
		if (!this.user.email) return;

		const emailSplit = this.user.email.split('.');
		if (emailSplit.length === 1) return;
		return `${emailSplit[0].charAt(0)}${emailSplit[1].charAt(0)}`.toUpperCase();
	}
}
</script>
