const webpackConfig     = require('./webpack.config');
const serverRawConfig   = require('../config/server/default');
const webpack           = require('webpack');


const hmr = ['react-hot-loader/patch'];


webpackConfig.entry.main = hmr.concat(webpackConfig.entry.main);
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.devtool = 'cheap-module-source-map';

webpackConfig.devServer = {
	contentBase     : '../src/client',
	port            : serverRawConfig.devPort,
	hot             : true,
	hotOnly         : true,
	inline          : true,
	noInfo          : true,
	compress        : true,
	publicPath      : webpackConfig.output.publicPath,
	clientLogLevel  : 'none',
	proxy           : {
		'**': {
			target: `http://localhost:${serverRawConfig.port}`,
		}
	}
};

module.exports = webpackConfig;
