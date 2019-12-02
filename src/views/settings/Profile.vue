<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Profile</v-toolbar-title>
		</v-toolbar>

		<profile-content />
	</div>
</template>

<script>
import ProfileContent from '../../components/settings/ProfileContent';

export default {
	components: { ProfileContent }
};
</script>
