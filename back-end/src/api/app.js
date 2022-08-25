require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { router } = require('./routers/router');
const ErrorMiddleware = require('./middlewares/error.middleware');

let app;
class App {
  constructor() {
    app = express();

    this.config();

    app.get('/coffee', (_req, res) => res.status(418).end());
    app.use(cors());
    app.use(router);
    app.use(ErrorMiddleware);
  }

  config() {
    const accessControl = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    app.use(express.json());
    app.use(accessControl);
  }

  start(PORT) {
    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

module.exports = App;
