const path = require('path')
const externals = require('webpack-node-externals')

module.exports = {
	entry: './ts-built/routes/routes.js',
	output: {
		filename:'backend.js',
		path:path.resolve(__dirname)
	},
	target: 'node',
	externals: [externals()]
};
	
