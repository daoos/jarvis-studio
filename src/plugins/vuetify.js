import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
	iconfont: "md",
	theme: {
		primary: "#03A9F4",
		secondary: "#0287C4",
		lighter: "#4CC1F7",
		complementary: "#F58702",
		accent: "#8c9eff",
		error: "#b71c1c",
		menu: "#012738",
		background: "#012F45",
		contrast: "#001A26"
	}
});
