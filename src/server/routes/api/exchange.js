const express       = require('express');
const exchange      = require('../../models/exchange');

const routes        = express.Router({ mergeParams: true });


routes.get('/', async(req, res) => {
	const { query: { from, to } } = req;
	try {
		const result = await exchange(from, to);
		res.answer(result);
	} catch (e) {
		res.report(e);
	}
});

module.exports = routes;