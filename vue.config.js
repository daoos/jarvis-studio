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
	}
};
