<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">Cloud Function Configurations</v-toolbar-title>
		</v-toolbar>

		<cloud-functions />
	</div>
</template>

<script>
import CloudFunctions from '../components/settings/CloudFunctions';

export default {
	components: { CloudFunctions }
};
</script>
