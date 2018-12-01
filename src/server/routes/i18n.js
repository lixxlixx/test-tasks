/**
 * TODO ADD TESTS!
 *
 */
const express       = require('express');

const routes        = express.Router({ mergeParams: true });

// FIXME dynamic require
routes.get('/:lang/:ns', (req, res) => {
	const { lang, ns } = req.params;
	
	try {
		const json = require(`../../../i18n/${lang}/${ns}`);
		res.json(json);
	} catch (e) {
		res.json({});
	}
});

module.exports = routes;