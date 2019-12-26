<template>
	<div>
		<v-container>
			<v-row>
				<v-col cols="12" md="8" offset-md="2">
					<v-card flat>
						<v-card-title primary-title>
							<div>
								<h2 class="headline mb-0">{{ user.displayName }}</h2>
							</div>
						</v-card-title>
						<ParametersList
							groupTitle="Identity"
							description="Identity of the user profile"
							:paramItems="userIdentity"
						/>
						<ParametersList
							groupTitle="Role and Accounts"
							description="The user role and the accounts"
							:paramItems="userRolesAndAccounts"
						/>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import ParametersList from '@/components/data-workflows/common/item/parameters/ParametersList';

export default {
	name: 'profile-content',
	components: { ParametersList },
	computed: {
		...mapState({
			user: state => state.user.user
		}),
		...mapGetters(['periodFiltered', 'whereConfFilter']),
		userIdentity() {
			return [
				{ id: 'email', label: 'Email', value: this.user.email },
				{
					id: 'emailVerified',
					label: 'Email Verified',
					value: this.user.emailVerified
				},
				{
					id: 'creationTime',
					label: 'Creation Time',
					value: this.user.metadata.creationTime
				}
			];
		},
		userRolesAndAccounts() {
			return [
				{ id: 'studioRoles', label: 'Role', value: this.user.studioRoles },
				{
					id: 'userAccounts',
					label: 'User Accounts',
					value: this.user.accounts
				}
			];
		}
	}
};
</script>
