const path = require('path')
const externals = require('webpack-node-externals')

module.exports = {
	entry: {
		main: './ts-built/routes/routes.js',
	},
	output: {
		filename:'backend.js',
		path:path.resolve(__dirname)
	},
	target: 'node',
	node: {
		__dirname : false
	},
	mode:'production',
	externals: [externals()]
};
	
