'use strict';

const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/view/index.ts',
	output: {
		filename: 'renderer.js',
		path: path.resolve(__dirname, 'static'),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.view.build.json',
							transpileOnly: true,
							appendTsSuffixTo: [
								/\.vue$/
							]
						}
					}
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template/index.html'
		})
	],
	resolve: {
		extensions: [
			'...',
			'.ts',
			'.vue'
		]
	}
};
