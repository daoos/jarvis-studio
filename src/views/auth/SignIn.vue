<template>
	<v-app id="signin" dark>
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12">
							<v-toolbar dark color="dark">
								<v-toolbar-title>JARVIS Signin</v-toolbar-title>
								<v-spacer />
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
								<v-btn outlined @click="googleSignIn" :loadingGoogleSignIn="loadingGoogleSignIn">
									<v-icon left dark>https</v-icon>
									Sign in with google
								</v-btn>

								<v-spacer />

								<v-btn :disabled="!valid" @click="signIn" :loading="loading">Sign in</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { InputValidationRules } from 'vuetify';

type Model = {
	email: string;
	password: string;
};

@Component({
	props: {
		source: String
	}
})
export default class SignIn extends Vue {
	valid: boolean = false;
	loading: boolean = false;
	loadingGoogleSignIn: boolean = false;
	model: Model = { email: '', password: '' };
	emailRules: InputValidationRules = [v => !!v || 'E-mail is required', v => /.+@.+/.test(v) || 'E-mail must be valid'];
	passwordRules: InputValidationRules = [
		v => !!v || 'Password is required',
		v => v.length >= 6 || 'Password must be greater than 6 characters'
	];

	googleSignIn() {
		this.loadingGoogleSignIn = true;
		this.$store.dispatch('user/googleSignIn').then(() => {
			this.$router.push('/');
		});
	}

	signIn() {
		this.loading = true;
		if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
			this.$store.dispatch('user/signIn', {
				email: this.model.email,
				password: this.model.password
			});
			this.loading = false;
		}
	}
}
</script>
