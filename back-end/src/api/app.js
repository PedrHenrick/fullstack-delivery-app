require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { router } = require('./routers/router');
const ErrorMiddleware = require('./middlewares/error.middleware');

class App {
  constructor(_app) {
    this.app = _app;
    this.app = express();

    this.config();

    this.app.get('/coffee', (_req, res) => res.status(418).end());
    this.app.use(cors());
    this.app.use(router);
    this.app.use('/images', express.static('public'));
    this.app.use(ErrorMiddleware);
  }

  config() {
    const accessControl = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.static('public'));
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  start(PORT) {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

module.exports = App;
