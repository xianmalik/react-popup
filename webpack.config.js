const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool: 'none',
	mode: 'development', // 'development' or, 'production'
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, './js/'),
		filename: 'app.js',
		libraryTarget: 'window'
	},
	module: {
		rules: [
			{
				test: /\.m?(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							{
								plugins: [
									'@babel/plugin-proposal-class-properties'
								]
							}
						],
					}
				}
			}
		]
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM"
	}
};
