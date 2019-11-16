import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
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
