const express       = require('express');
const _             = require('lodash');
const mockData      = require('./tickets.json');
const exchange      = require('../../models/exchange');
const config        = require('../../../../config');


const routes        = express.Router({ mergeParams: true });


routes.get('/', async(req, res) => {
	try {
		const ticketCurrency = config('ticketsCurrency', 'client');
		
		if (ticketCurrency === 'RUB') {
			res.answer(mockData.tickets);
		} else {
			const rateValues = await exchange('RUB', ticketCurrency);
			const { value } = rateValues.find(currency => currency.currency === ticketCurrency);
			const newMockObject = _.cloneDeep(mockData);
			
			res.answer(newMockObject.tickets.map(ticket => {
				ticket.price *= value;
				return ticket;
			}));
		}
	} catch (e) {
		res.report(e);
	}
	
});

module.exports = routes;