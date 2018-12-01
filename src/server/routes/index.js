/**
 * TODO ADD TESTS!
 * 
 */
const express           = require('express');
const api               = require('./api');
const i18n              = require('./i18n');
const resources         = require('../helpers/static-resources');
const config            = require('../../../config');

const routes = express.Router({ mergeParams: true });

routes.use('/i18n', i18n);
routes.use('/api', api);

/**
 * Main page. Available only for authenticated users
 */
routes.get('/', async(req, res) => {
	res.render('index', {
		clientConfig: config(undefined, 'client'),
		resources,
		page: 'main'
	});
});

module.exports = routes;