const express   = require('express');
const echo      = require('./echo');
const tickets   = require('./tickets');

const routes = express.Router({ mergeParams: true });

routes.use((req, res, next) => {
	res.answer = (payload = {}) => res.json({ payload });
	res.report = error => {
		if (typeof error.params === 'string') {
			error.params = JSON.parse(error.params);
		}
		res.json({ error: { ...error, message: error.message } });
	};
	res.xhrRedirect = redirectUrl => {
		res.json({ redirect: redirectUrl });
	};
	
	next();
});

// api points
routes.use('/echo', echo);
routes.use('/tickets', tickets);


module.exports = routes;