const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
	babel: {
		presets: ['react-native']
	},
	webpack: {
		aliases: {
			'react-native': 'react-native-web'
		},
		extra: {
		plugins: [
	    new WebpackShellPlugin({
				onBuildEnd: ['electron .']
			})
	  ]
		},
		config(config) {
			config.resolve.extensions = ['.web.js', '.js', '.json'];
			config.module.rules[0].exclude = /(node_modules[\\/]nwb|nwb[\\/]polyfills\.js$)/;
			return config;
		}
	}
}
