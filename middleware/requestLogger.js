const morgan = require('morgan');
const logger = require('../utils/logger').basicLogger;

const stream = {
    write: (message) => logger.http(message)
};

const logRequest = morgan(":remote-addr :method :url :status :res[content-length] - :response-time ms", { stream });

module.exports = { logRequest };