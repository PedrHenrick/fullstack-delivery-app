const port = process.env.PORT || 3001;
const App = require('./app');

new App().start(port);
