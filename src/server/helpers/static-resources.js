/**
 * Get resource files default names,
 * Merge with webpack names.
 * 
 * Webpack add hash of file to version
 * 
 */
const resources = require('../../../resources.json');

let assets = {};
try {
	assets = require('../../../static/dist/resources.json');
} catch (e) {} // eslint-disable-line


module.exports = Object.assign({}, resources, assets);