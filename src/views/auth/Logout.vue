<template>
	<div></div>
</template>

<script>
export default {
	name: 'logout',
	mounted() {
		this.$store.dispatch('user/signOut');
	}
};
</script>
