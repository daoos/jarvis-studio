<template>
	<v-avatar color="red" size="36">
		<!-- TODO: Add user img -->
		<span class="white--text">UN</span>
	</v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserInfo } from 'firebase';

@Component
export default class AvatarComponent extends Vue {
	@Prop() user?: UserInfo;
}
</script>
