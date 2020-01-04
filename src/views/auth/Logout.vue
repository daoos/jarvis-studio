<template>
	<div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Logout extends Vue {
	mounted() {
		this.$store.dispatch('user/signOut');
	}
}
</script>
