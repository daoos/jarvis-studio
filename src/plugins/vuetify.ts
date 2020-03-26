import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	iconfont: 'md',
	theme: {
		themes: {
			light: {
				primary: '#00B5B9',
				secondary: '#55C6A9',
				complementary: '#55C6A9',
				error: '#b71c1c',
				menu: '#f4f7fa',
				background: '#f4f7fa',
				contrast: '#001A26'
			},
			// TODO: Create dark mode
			dark: {
				primary: '#00B5B9',
				secondary: '#55C6A9',
				complementary: '#55C6A9',
				error: '#b71c1c',
				menu: '#f4f7fa',
				background: '#f4f7fa',
				contrast: '#001A26'
			}
		}
	}
});
