<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Users</v-toolbar-title>
		</v-toolbar>

		<users-content />
	</div>
</template>

<script>
import UsersContent from '../../components/settings/UsersContent';

export default {
	components: { UsersContent }
};
</script>
