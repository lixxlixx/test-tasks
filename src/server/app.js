const express               = require('express');
const { join, resolve }     = require('path');
const logger                = require('morgan');
const bodyParser            = require('body-parser');
const routes                = require('./routes');

const app       = express();
const router    = express.Router({ mergeParams: true });
const appDir    = resolve(__dirname, './');

app.set('views', join(appDir, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'production') {
	app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(express.static(join(appDir, '../../static')));
app.use(router.use(routes));

app.use((error, req, res, next) => { // eslint-disable-line
	res.render('error', {
		status: error.status || 500,
		message: error.message,
	});
});

module.exports = app;