<template>
	<div class="d-flex justify-center align-center fill-height">
		<div class="d-flex flex-column text-right body-2">
			<span class="text--secondary">{{ email }}</span>

			<v-menu v-model="showMenu" transition="slide-y-transition" offset-y>
				<template v-slot:activator="{ on }">
					<span v-on="on" class="cta" :class="{ 'red--text': isUpdated }">
						{{ updatedDate | moment('YYYY/MM/DD - HH:mm:ss') }}
					</span>
				</template>

				<v-list max-height="40vh">
					<template v-if="Object.keys(archivedConfigurations).length > 0">
						<v-list-item
							v-for="configuration in archivedConfigurations"
							:key="configuration.id"
							@click="applyConfiguration(configuration)"
						>
							<v-list-item-title>{{ configuration.id | moment('YYYY/MM/DD - HH:mm:ss') }}</v-list-item-title>
						</v-list-item>
					</template>

					<v-list-item v-else>
						<v-list-item-title>No configuration history.</v-list-item-title>
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
import { Configuration } from '@/types';
import { mapState } from 'vuex';
import AvatarComponent from '@/components/common/AvatarComponent.vue';

@Component({
	components: { AvatarComponent },
	computed: {
		...mapState({
			archivedConfigurations(state: any) {
				return state[this.archivedConfsModuleName].data;
			}
		})
	}
})
export default class HistoryComponent extends Vue {
	@Prop({ required: true }) moduleName!: string;
	@Prop({ required: true }) archivedConfsModuleName!: string;
	@Prop({ required: true }) docId!: string;
	// TODO: Replace with UserSocialInfo
	@Prop({ required: true }) email!: string;
	@Prop({ required: true }) updatedDate!: string;

	showMenu: boolean = false;
	isUpdated: boolean = false;

	mounted() {
		this.fetchArchivedConfs();
	}

	activated() {
		this.fetchArchivedConfs();
	}

	fetchArchivedConfs() {
		this.$store.dispatch(`${this.archivedConfsModuleName}/closeDBChannel`, { clearModule: true });
		this.$store.dispatch(`${this.archivedConfsModuleName}/fetchAndAdd`, { id: this.docId });
	}

	applyConfiguration(configuration: Configuration) {
		this.isUpdated = false;
		this.$store.commit(`${this.moduleName}/UPDATE_DOCUMENT_LOCALLY`, { id: this.docId, newDoc: configuration });
		this.isUpdated = true;
	}
}
</script>
