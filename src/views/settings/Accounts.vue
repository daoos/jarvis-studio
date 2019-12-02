<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Accounts</v-toolbar-title>
		</v-toolbar>

		<accounts-content />
	</div>
</template>

<script>
import AccountsContent from '../../components/settings/AccountsContent';

export default {
	components: { AccountsContent }
};
</script>
