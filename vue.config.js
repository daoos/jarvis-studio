module.exports = {
	configureWebpack: {
		devtool: 'source-map'
	},
	lintOnSave: 'error',
	devServer: {
		overlay: {
			warnings: true,
			errors: true
		}
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/scss/global/global.scss";`
			}
		}
	}
};
