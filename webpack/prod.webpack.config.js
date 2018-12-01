const webpackConfig         = require('./webpack.config');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const AssetsPlugin          = require('assets-webpack-plugin');


webpackConfig.module.rules.map( rule => {
	if (String(rule.test) === String(/\.less$/)) {
		rule.use = rule.use.map(loader => 
			loader === 'style-loader' ? MiniCssExtractPlugin.loader : loader
		);
	}
});


webpackConfig.optimization = {
	splitChunks: {
		cacheGroups: {
			vendor: {
				test: /node_modules/,
				chunks: 'initial',
				name: 'vendor',
				priority: 10,
				enforce: true
			}
		}
	}
};


webpackConfig.plugins.push(new AssetsPlugin({
	filename: 'resources.json',
	path: webpackConfig.output.path
}));


module.exports = webpackConfig;
