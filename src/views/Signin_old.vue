<template>
  <v-app id="signin" dark>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="dark">
                <v-toolbar-title>JARVIS Signin</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    id="Email"
                    type="email"
                    :rules="emailRules"
                    required
                    data-cy="signinEmailField"
                  >
                  </v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.password"
                    required
                    :rules="passwordRules"
                    data-cy="signinPasswordField"
                  >
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="white"
                  outline
                  @click="googleSignin"
                  :loadingGoogleSignin="loadingGoogleSignin"
                >
                  <v-icon left dark>https</v-icon>
                  Signin with google
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="dark"
                  :disabled="!valid"
                  @click="signin"
                  :loading="loading"
                  >Signin</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    loading: false,
    loadingGoogleSignin: false,
    model: {
      email: "",
      password: ""
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must be greater than 6 characters"
    ]
  }),
  props: {
    source: String
  },
  methods: {
    googleSignin() {
      this.loadingGoogleSignin = true;
      this.$store.dispatch("userGoogleSignin");
    },
    signin() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch("userSignin", {
          email: this.model.email,
          password: this.model.password
        });
      }
    }
  }
};
</script>
