const express   = require('express');
const exchange  = require('./exchange');
const tickets   = require('./tickets');

const routes = express.Router({ mergeParams: true });

routes.use((req, res, next) => {
	res.answer = (payload = {}) => res.json({ payload });
	res.report = (error = {}) => res.json({ error });
	
	next();
});

// api points
routes.use('/tickets', tickets);
routes.use('/exchange', exchange);


module.exports = routes;