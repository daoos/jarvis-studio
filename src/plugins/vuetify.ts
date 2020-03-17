import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	iconfont: 'md',
	theme: {
		themes: {
			light: {
				primary: '#668fd9',
				secondary: '#0287C4',
				complementary: '#F58702',
				error: '#b71c1c',
				menu: '#f4f7fa',
				background: '#f4f7fa',
				contrast: '#001A26'
			},
			// TODO: Create dark mode
			dark: {
				primary: '#668fd9',
				secondary: '#0287C4',
				complementary: '#F58702',
				error: '#b71c1c',
				menu: '#f4f7fa',
				background: '#f4f7fa',
				contrast: '#001A26'
			}
		}
	}
});
