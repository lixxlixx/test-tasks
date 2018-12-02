const axios         = require('axios');

const API_EXCHANGE = 'http://free.currencyconverterapi.com/api/v5/convert';

module.exports = async(from, to) => {
	if ( ! (from && to)) throw new Error('request error');
	
	const loadTo = Array.isArray(to) ? to : [to];
	const loadParallel = [];
	
	loadTo.map(toItem => {
		const exchangeStr = `${from}_${toItem}`;
		loadParallel.push(new Promise(async(resolve, reject) => {
			const { data } = await axios.get(`${API_EXCHANGE}?q=${exchangeStr}&compact=y`);
			if (data) resolve({ currency: toItem, value: data[exchangeStr].val });
			else reject();
		}));
	});
	const result = await Promise.all(loadParallel);
	
	return result;
};