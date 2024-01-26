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
const expressLayouts = require("express-ejs-layouts");
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

process.on("SIGINT", () => {
	basicLogger.warn("Server termination request obtained");
	basicLogger.info("Shutting down server");
	secureServer.close(() => {
		db.close(false, () => {
			basicLogger.info("Database connection closed");
			basicLogger.info("server shutdown");
			process.exit(0);
		});
	});
});

process.on("uncaughtException", (ex) => {
	basicLogger.error("Uncaught error occured.\n" + ex);
	basicLogger.error(ex.stack);
});

function obtainConnection() {
	mongoose.connect(process.env.DATABASE_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
}

const db = mongoose.connection;

db.on("error", (err) => {
	basicLogger.error(err.code);
	if (err.code == "ECONNREFUSED") {
		basicLogger.warn("Trying again in 30 seconds");
		setTimeout(obtainConnection, 30000);
	}
});

db.once("open", () => {
	basicLogger.info("Database connection established..");
});

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * EJS setup
app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

app.use(logRequest);
app.use(session(SESSION_OPTIONS));

app.use(passport.initialize());
app.use(passport.session());
app.use(
	"/api-docs",
	swaggerUI.serve,
	swaggerUI.setup(swaggerJsDoc(swaggerOptions))
);

// app.use("/", (req, res) => {
// 	res.send("student portal");
// });

app.get("/", (req, res) => {
	// res.send("hello");
	res.render("login", { layout: false });
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
	try {
		obtainConnection();
	} catch (error) {
		console.log("error occured");
	}
});

