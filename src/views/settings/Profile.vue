<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Profile</v-toolbar-title>
		</v-toolbar>

		<profile-content />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProfileContent from '@/components/settings/ProfileContent.vue';

@Component({
	components: { ProfileContent }
})
export default class Profile extends Vue {}
</script>
