require('dotenv').config();

const port = process.env.PORT || 3001;
const App = require('./app');

let app;
new App(app).start(port);
