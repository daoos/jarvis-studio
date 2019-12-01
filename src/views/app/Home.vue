<template>
	<div>
		<data-overview-header title="Welcome to Jarvis Studio" sub-title="Keep Calm and Ask for the Retail Data Butler" />
		<data-overview-content />
	</div>
</template>

<script>
import DataOverviewHeader from '@/components/app/layouts/data-overview/DataOverviewHeader';
import DataOverviewContent from '@/components/app/layouts/data-overview/DataOverviewContent';

export default {
	name: 'home-view',
	components: { DataOverviewHeader, DataOverviewContent }
};
</script>
