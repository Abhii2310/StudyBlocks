require('dotenv').config();
const express = require("express");
const app = express();
const logger = require('./logger');

// --- Prometheus metrics setup ---
const promClient = require('prom-client');
const metricsMiddleware = require('./middlewares/metrics');

// Enable metrics collection
promClient.collectDefaultMetrics({
  prefix: 'studyblocks_',
  timeout: 5000,
  gcDurationBuckets: [0.1, 5, 15, 50, 90, 120],
});

// Add prometheus metrics middleware
app.use(metricsMiddleware);

// Add metrics routes
// app.use('/monitoring', metricsRouter);
// --- End Prometheus metrics setup ---

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/notes", require("./routes/note"));

// Instructor video upload/review route
app.use("/api/v1/video-upload", require("./routes/videoUpload"));

// Route to seed demo user for robust demo login
app.use("/api/seed-demo-user", require("./routes/seedDemoUserRoute"));

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		logger.info(`Server is running at http://localhost:${PORT}`);
		// Automated test log for ELK health check
		logger.info('Test log from backend', { test: true, timestamp: new Date().toISOString() });
	});
}

module.exports = { app, logger };
