<template>
	<div>
		<v-alert v-if="item.archive" type="warning">This configuration is archived.</v-alert>

		<v-row v-if="activeHeader" class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-black text-truncate complementary--text">{{ viewId }}</span>

			<v-spacer />

			<v-btn text color="grey" @click="goBack()">Go Back</v-btn>

			<template v-if="viewType === 'conf'">
				<configuration-status
					class="mr-3"
					:item="item"
					:collection="collection"
					:is-activated="customKey ? item[customKey].activated : item.activated"
					:is-small="false"
					:is-label="true"
					:custom-key="customKey"
				/>

				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-icon v-on="on">more_vert</v-icon>
					</template>

					<v-list>
						<v-list-item @click="item.archive ? toggleArchiveConf() : showArchiveDialog()">
							<v-list-item-title>{{ actionName }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>

				<v-dialog v-model="archiveSnackbar.show" persistent max-width="400">
					<v-card>
						<v-card-title class="headline warning">Warning</v-card-title>
						<v-card-text>
							<p class="mt-4">
								Please confirm the archiving of <strong>{{ item.id }}.</strong>
							</p>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn color="primary" text @click="hideArchiveDialog">Close</v-btn>

							<transition name="fade" mode="out-in">
								<v-progress-circular v-if="isLoading" indeterminate size="20" color="primary" />
								<v-btn v-else color="primary" text @click="toggleArchiveConf">Archive</v-btn>
							</transition>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</template>

			<RunStatusChip
				v-if="viewType === 'run'"
				:smallChip="false"
				:runStatus="runStatus"
				chipTextClass="text-uppercase"
				:chipLabel="true"
			/>
		</v-row>

		<v-row v-else class="pl-5 pt-4 pr-5">
			<span class="headline font-weight-bold">{{ viewId }}</span>
		</v-row>

		<v-row v-if="description" class="pl-5 pr-5 pt-3 pb-3">
			<span class="subheading">{{ description }}</span>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject, Snackbar } from '@/types';
import ConfigurationStatus from '../../../configuration/ConfigurationStatus.vue';
import RunStatusChip from '../../../runs/RunStatusChip.vue';
import store from '@/store';

@Component({
	components: { ConfigurationStatus, RunStatusChip }
})
export default class ViewHeader extends Vue {
	@Prop({ required: true }) readonly activeHeader!: boolean;
	@Prop({ required: true }) readonly viewId!: string;
	@Prop({ required: true }) readonly viewType!: string;
	@Prop({ required: true }) readonly item!: AnyObject;
	@Prop(String) readonly collection: string | undefined;
	@Prop(String) readonly runStatus: string | undefined;
	@Prop(String) readonly description: string | undefined;
	@Prop({ default: null }) readonly customKey: string | undefined;

	isLoading: boolean = false;
	archiveSnackbar: Snackbar = { show: false, timeout: 10000 };

	goBack() {
		this.$router.go(-1);
	}

	showArchiveDialog() {
		this.archiveSnackbar.show = true;
	}

	hideArchiveDialog() {
		this.archiveSnackbar.show = false;
	}

	toggleArchiveConf() {
		const payload = this.item.archive
			? { id: this.item.id, archive: !this.item.archive }
			: { id: this.item.id, activated: false, archive: !this.item.archive };

		this.isLoading = true;

		store.dispatch(`${this.collection}/patch`, payload).then(() => {
			this.hideArchiveDialog();
			this.isLoading = false;
		});
	}

	get actionName(): string {
		return this.item.archive ? 'Unarchive' : 'Archive';
	}
}
</script>
