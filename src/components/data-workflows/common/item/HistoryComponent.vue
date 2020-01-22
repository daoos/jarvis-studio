<template>
	<div class="d-flex justify-center align-center fill-height">
		<div class="d-flex flex-column text-right body-2">
			<span class="text--secondary">{{ email }}</span>

			<v-menu v-model="showMenu" transition="slide-y-transition" offset-y>
				<template v-slot:activator="{ on }">
					<span v-on="on" class="cta">{{ updatedDate | moment('YYYY/MM/DD - HH:mm:ss') }}</span>
				</template>

				<v-list max-height="40vh">
					<v-list-item
						v-for="configuration in archivedConfigurations"
						:key="configuration.id"
						@click="applyConfiguration(configuration)"
					>
						<v-list-item-title>{{ configuration.id | moment('YYYY/MM/DD - HH:mm:ss') }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>

		<!-- TODO: Bind user instead of initials -->
		<avatar-component class="mx-2" :email="email" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { Configuration } from '@/types';
import AvatarComponent from '@/components/common/AvatarComponent.vue';

@Component({
	components: { AvatarComponent }
})
export default class HistoryComponent extends Vue {
	// TODO: Replace with UserSocialInfo
	@Prop({ required: true }) email!: string;
	@Prop({ required: true }) updatedDate!: string;
	@State(state => state.getArchivedConfigurations.data) archivedConfigurations!: Configuration[];

	showMenu: boolean = false;

	async mounted() {
		await this.$store.dispatch('getArchivedConfigurations/fetchAndAdd', {
			type: 'storage-to-tables-conf-archive',
			id: '000010_STT_RFID_RETAIL_RELOAD_FILES_FTP'
		});
	}

	applyConfiguration(configuration: Configuration) {
		console.log('Apply conf:', configuration);
	}
}
</script>
