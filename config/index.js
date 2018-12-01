/**
 * Merge env config with default config
 */
const _ = require('lodash');

const serverDefConf = require('./server/default');
let serverEnvConf = process.env.NODE_ENV === 'production'
	? require('./server/prod')
	: require('./server/dev');


const clientDefConf = require('./client/default');
let clientEnvConf = process.env.NODE_ENV === 'production'
	? require('./client/prod')
	: require('./client/dev');

const config = {
	server: Object.assign({}, serverDefConf, serverEnvConf),
	client: Object.assign({}, clientDefConf, clientEnvConf)
};


/**
 * Config getter
 * 
 * @param path
 * @param ns
 * @return {*}
 */
module.exports = (path, ns = 'server') => {
	return path ? _.get(config[ns], path) : config[ns];
};
