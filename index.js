if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require("path");
const logger = require("./utils/logger/logger");
const { logRequest } = require("./middleware/requestLogger");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const { SESSION_OPTIONS } = require("./configs/session");
const { MONGO_OPTIONS } = require("./configs/db");
const passport = require("./configs/passportConfig");
const routes = require("./routes/index");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { swaggerOptions } = require("./configs/swaggerConfig");
const cors = require("cors");
const corsOptions = require("./configs/corsConfig");
const fs = require("fs");
const https = require("https");

const key = fs.readFileSync(
  path.join(__dirname, "certificates/" + process.env.CERT_KEY)
);
const certificate = fs.readFileSync(
  path.join(__dirname, "certificates/" + process.env.CERT)
);
const secureServer = https.createServer({ key: key, cert: certificate }, app);
const port = process.env.SERVER_PORT || 443;
const basicLogger = logger.basicLogger;
const sessionStore = mongoStore.create({
  MONGO_OPTIONS,
  mongoUrl: process.env.DATABASE_URL,
});
SESSION_OPTIONS.store = sessionStore;

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  basicLogger.error(err.code);
});
db.once("open", () => {
  basicLogger.info("Database connection established..");
});

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logRequest);
app.use(session(SESSION_OPTIONS));

app.use(passport.initialize());
app.use(passport.session());
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerOptions))
);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use("/student-portal", routes);

app.use((err, req, res, next) => {
	const { statusCode = 500, message = "Internal server error" } = err;
	basicLogger.error(err);
	basicLogger.error(err.stack);
	res.status(statusCode).json({ message });
});

secureServer.listen(port, () => {
  basicLogger.info("server started running on port " + port);
});