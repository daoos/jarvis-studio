<template>
	<div class="d-flex justify-center align-center fill-height">
		<div class="d-flex flex-column text-right body-2">
			<span class="text--secondary">{{ updatedBy }}</span>

			<v-menu v-model="showMenu" transition="slide-y-transition" offset-y max-height="40vh" z-index="10">
				<template v-slot:activator="{ on }">
					<span
						v-on="on"
						class="cta"
						:class="{ 'red--text': isUpdated, 'font-weight-bold': isUpdated }"
						@click="fetchArchivedConfs"
					>
						{{ updatedDate | moment('YYYY/MM/DD - HH:mm:ss') }}
					</span>
				</template>

				<v-list>
					<v-list-item v-if="isLoading" class="d-flex justify-center">
						<v-progress-circular indeterminate size="32" color="primary" />
					</v-list-item>

					<template v-else-if="Object.keys(archivedConfigurations).length > 0">
						<v-list-item @click="resetConfiguration">
							<v-list-item-icon>
								<!-- TODO: Update Object.values(users)[0] that doesn't work -->
								<avatar-component :user="Object.values(users)[0]" />
							</v-list-item-icon>

							<v-list-item-title>Current Configuration</v-list-item-title>
						</v-list-item>

						<v-list-item
							v-for="configuration in archivedConfigurations"
							:key="getItemTitle(configuration)"
							@click="applyConfiguration(configuration)"
						>
							<v-list-item-icon>
								<avatar-component :user="{ email: configuration.updated_by }" />
							</v-list-item-icon>

							<v-list-item-title>{{ getItemTitle(configuration) | moment('YYYY/MM/DD - HH:mm:ss') }}</v-list-item-title>
						</v-list-item>
					</template>

					<v-list-item v-else>
						<v-list-item-title>No configuration history.</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</div>

		<v-progress-circular v-if="isUserLoading" indeterminate color="primary" size="20" class="mx-2" />
		<!-- TODO: Update Object.values(users)[0] that doesn't work -->
		<avatar-component v-else-if="Object.values(users)[0]" class="mx-2" :user="Object.values(users)[0]" />
		<avatar-component v-else class="mx-2" :user="{ email: updatedBy }" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Configuration, User } from '@/types';
import { mapState } from 'vuex';
import { State } from 'vuex-class';
import { users } from '@/store/modules/easy-firestore/users';
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
	@Prop({ required: true, default: 'No email' }) updatedBy!: string;
	@Prop({ required: true, default: 'No updated date' }) updatedDate!: string;

	@State(state => state.users.data) users!: User;

	showMenu: boolean = false;
	isLoading: boolean = false;
	isUserLoading: boolean = true;
	isFetched: boolean = false;
	isUpdated: boolean = false;

	mounted() {
		this.isUserLoading = true;

		this.$store.dispatch(`${users.moduleName}/fetchAndAdd`, { where: [['email', '==', this.updatedBy]] }).then(() => {
			this.isUserLoading = false;
		});
	}

	fetchArchivedConfs() {
		if (this.isFetched) return;

		this.isLoading = true;

		this.$store.dispatch(`${this.archivedConfsModuleName}/closeDBChannel`, { clearModule: true });
		this.$store.dispatch(`${this.archivedConfsModuleName}/fetchAndAdd`, { id: this.docId }).then(() => {
			this.isLoading = false;
			this.isFetched = true;
		});
	}

	getItemTitle(configuration: Configuration): string {
		return configuration.update_date || configuration.updated_date;
	}

	applyConfiguration(configuration: Configuration) {
		this.$store.commit(`${this.moduleName}/UPDATE_DOCUMENT_LOCALLY`, { id: this.docId, newDoc: configuration });
		this.isUpdated = true;
	}

	resetConfiguration() {
		this.isUpdated = false;
		this.$store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
		this.$store.dispatch(`${this.moduleName}/fetchById`, this.docId);
	}
}
</script>
