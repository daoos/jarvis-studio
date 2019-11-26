<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Profile</v-toolbar-title>
		</v-toolbar>

		<Users />
	</div>
</template>

<script>
import Users from '../components/UserProfile';

export default {
	components: { Users }
};
</script>
