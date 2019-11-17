<template>
	<v-app id="signin" dark>
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
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
										v-model="model.email"
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
										:rules="passwordRules"
										required
										data-cy="signinPasswordField"
									>
									</v-text-field>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-btn
									outlined
									@click="googleSignin"
									:loadingGoogleSignin="loadingGoogleSignin"
								>
									<v-icon left dark>https</v-icon>
									Signin with google
								</v-btn>
								<v-spacer></v-spacer>
								<v-btn :disabled="!valid" @click="signin" :loading="loading">
									Signin
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
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
				this.loading = false;
			}
		}
	}
};
</script>
