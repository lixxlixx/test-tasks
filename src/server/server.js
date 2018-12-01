
const http      = require('http');
const config    = require('../../config');
const app       = require('./app');

return http.createServer(app).listen(config('port'), () => {
	if (process.env.NODE_ENV !== 'production') {
		console.log(`Started at "http://localhost:${config('port')}" in development mode!`); // eslint-disable-line
	}
});
