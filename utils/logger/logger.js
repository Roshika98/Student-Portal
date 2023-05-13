const winston = require('winston');


const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'green',
    http: 'magenta'
}
winston.addColors(colors);

const customBasicFormat = winston.format.combine(winston.format.colorize({
    all: true
}), winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
}), winston.format.printf((info) => {
    return `${info.timestamp} - [${info.level}] - ${info.message}`;
}));

const basicLogger = winston.createLogger({
    format: customBasicFormat,
    level: 'debug',
    transports: [
        new winston.transports.Console()
    ]
});

const requestLogger = winston.createLogger({
    format: customBasicFormat,
    level: 'debug',
    transports: [
        new winston.transports.Console()
    ]
});



module.exports = { basicLogger, requestLogger };