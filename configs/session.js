const { SessionOptions } = require('express-session');

const ONE_HOUR = 1000 * 60 * 60;
const THIRTY_MINUTES = ONE_HOUR / 2;
const SIX_HOURS = ONE_HOUR * 6;

var SESSION_OPTIONS = {
    secret: process.env.SESSION_SECRET || 'this is a secret',
    name: process.env.SESSION_NAME || 'session',
    cookie: {
        maxAge: parseInt(process.env.SESSION_IDLE_TIMEOUT) || THIRTY_MINUTES,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
}

module.exports = { SESSION_OPTIONS };