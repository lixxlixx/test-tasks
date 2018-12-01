const express       = require('express');

const routes        = express.Router({ mergeParams: true });
const mockData      = require('./tickets.json');

routes.get('/', (req, res) => {
	res.answer(mockData.tickets);
});

module.exports = routes;