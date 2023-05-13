const MONGO_OPTIONS = {
    secret: process.env.MONGOSTORE_SECRET || 'secret'
}

module.exports = { MONGO_OPTIONS };