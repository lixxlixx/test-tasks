const webpack               = require('webpack');
const { resolve }           = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const autoprefixer          = require('autoprefixer');

const inputPath = resolve(__dirname, '../src/client');
const outputPath = resolve(__dirname, '../static/dist');

const webpackConfig = {
	mode: process.env.NODE_ENV,
	context: inputPath,
	entry: {
		main            : ['babel-polyfill', './main.js'],
		reset           : ['./styles/reset.less']
	},
	output: {
		publicPath      : '/dist/',
		path            : outputPath,
		filename        : '[name].js?[hash:10]',
		chunkFilename   : '[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],

			},
			{
				test: /styles-core\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
				]
			},
			{
				test: /reset\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
				]
			},
			{
				test: /\.less$/,
				exclude: [/styles-core\.less$/, /reset\.less$/],
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							localIdentName: '[hash:base64:7]___[local]',
							modules: true,
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers:['last 2 version']
								})
							]
						}
					},
					'less-loader'
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'url-loader',
				options: {
					limit: 25000,
					name: 'img/[sha512:hash:base64:7].[ext]?[hash:10]',
				},
			},
			{
				test: /\.(woff|ttf)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'url-loader',
				options: {
					limit: 25000,
					name: 'fonts/[sha512:hash:base64:7].[ext]?[hash:10]',
				},
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json', '.less', '.css'],
		modules: ['node_modules', inputPath]
	},
	plugins: [
		new webpack.DefinePlugin({
			env: JSON.stringify(process.env.NODE_ENV)
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css?[hash:10]',
			chunkFilename: '[id].css'
		})
	]
};

module.exports = webpackConfig;
