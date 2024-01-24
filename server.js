const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const connectDB = require("./config/db");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const sanitizer = require("express-html-sanitizer");
const { rateLimit } = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const options = require("./swagger.jsdoc");
const swaggerUi = require("swagger-ui-express");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Database connection
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

const app = express();
//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Development logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File upload
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Sanitize requests
app.use(sanitizer());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter);

//Prevent parameter pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(ErrorHandler);

const specs = swaggerJSDoc(options);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
