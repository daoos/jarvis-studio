<template>
	<div>
		<v-toolbar dense tabs color="primary">
			<v-toolbar-title class="pl-2 display-1">
				Cloud Function Configurations
			</v-toolbar-title>
		</v-toolbar>

		<GcpCloudFunctions />
	</div>
</template>

<script>
import GcpCloudFunctions from '../components/GcpCloudFunctions';

export default {
	components: {
		GcpCloudFunctions
	}
};
</script>
