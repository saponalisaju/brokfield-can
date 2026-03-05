const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Database
require("./src/config/database");

// Routers
const userRouter = require("./src/routes/userRoute");
const sliderRouter = require("./src/routes/sliderRoute");
const applicationRouter = require("./src/routes/applicationRoute");

const app = express();

// ======= TRUST PROXY =======
// If app is behind a proxy (Render, Vercel, Nginx), trust first proxy
app.set("trust proxy", 1);

// ======= CORS SETUP =======
const allowedOrigins = [
  "http://localhost:3000",
  "https://canadacocacolacompanyvisa.com",
  "https://www.canadacocacolacompanyvisa.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server requests

    const normalized = origin.replace(/\/+$/, ""); // remove trailing slash

    if (allowedOrigins.includes(normalized)) {
      return callback(null, true);
    }

    // Allow Vercel preview domains
    try {
      const host = new URL(normalized).host;
      if (/\.vercel\.app$/i.test(host)) return callback(null, true);
    } catch (_) {
      // invalid origin
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Requested-With",
  ],
  optionsSuccessStatus: 204,
  maxAge: 86400, // cache preflight for 1 day
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Cross-Origin Resource Policy
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// ======= STATIC FILES =======
app.use("/static", express.static(path.join(__dirname, "public")));

// ======= SECURITY HEADERS =======
app.use(helmet());

// ======= RATE LIMITER =======
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  keyGenerator: (req) => req.ip, // use IP safely
});
app.use(limiter);

// ======= BODY PARSERS =======
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ======= ROUTES =======
app.get("/lander", (req, res) => {
  res.redirect(301, "/");
});

app.use("/api/users", userRouter);
app.use("/api/slider", sliderRouter);
app.use("/api/application", applicationRouter);

// ======= ERROR HANDLING =======
// Handle CORS errors gracefully
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: err.message });
  }
  next(err);
});

module.exports = app;
