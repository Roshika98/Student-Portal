if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const expressLayouts = require('express-ejs-layouts');
const logger = require('./utils/logger');
const { logRequest } = require('./middleware/requestLogger');

const port = process.env.SERVER_PORT;
const basicLogger = logger.basicLogger;

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logRequest);
app.get('/student-portal', (req, res) => {
    res.send("Hello there!");
});


server.listen(port, () => {
    basicLogger.info('server started running on port ' + port);

});