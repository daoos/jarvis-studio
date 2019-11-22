<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Users</v-toolbar-title>
		</v-toolbar>

		<Users />
	</div>
</template>

<script>
import Users from "../components/Users";

export default {
	components: { Users }
};
</script>
