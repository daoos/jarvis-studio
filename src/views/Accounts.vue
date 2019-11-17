<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Accounts</v-toolbar-title>
		</v-toolbar>

		<Accounts />
	</div>
</template>

<script>
import Accounts from "../components/Accounts";

export default {
	components: { Accounts }
};
</script>
