const express       = require('express');

const routes        = express.Router({ mergeParams: true });

routes.get('/', (req, res) => setTimeout(() => res.answer(req.query), 1000));
routes.post('/', (req, res) => setTimeout(() => res.answer(req.body), 1000));
routes.put('/', (req, res) => setTimeout(() => res.answer(req.body), 1000));
routes.delete('/', (req, res) => setTimeout(() => res.answer(req.body), 1000));

module.exports = routes;