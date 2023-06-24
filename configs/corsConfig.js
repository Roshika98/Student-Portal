const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://student-portal-e4cf8.web.app",
    "https://student-portal-e4cf8.firebaseapp.com",
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
