<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12 md8 offset-md2>
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
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import store from "@/store/index";
import ParametersTable from "@/components/widgets/parameters/ParametersTable.vue";
import ParametersList from "@/components/widgets/parameters/ParametersList.vue";

export default {
  components: {
    ParametersTable,
    ParametersList
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      accounts: state => state.accounts.data
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    userIdentity() {
      return [
        { id: "email", label: "Email", value: this.user.email },
        {
          id: "emailVerified",
          label: "Email Verified",
          value: this.user.emailVerified
        },
        {
          id: "creationTime",
          label: "Creation Time",
          value: this.user.metadata.creationTime
        }
      ];
    },
    userRolesAndAccounts() {
      return [
        { id: "studioRoles", label: "Role", value: this.user.studioRoles },
        {
          id: "userAccounts",
          label: "User Accounts",
          value: this.user.accounts
        }
      ];
    }
  }
};
</script>

<style scoped></style>
