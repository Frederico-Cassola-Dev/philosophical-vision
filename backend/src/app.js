// Load the express module to create a web application

const express = require("express");
const cookieParser = require("cookie-parser");
// const nodemailer = require("nodemailer");

const app = express();
const cors = require("cors");
const router = require("./router");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://127.0.0.1:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

/* ************************************************************************* */

// Production-ready setup: What is it for, and when should I enable it?

// The code includes commented sections to set up a production environment where the frontend and backend are served from the same server.

// What it's for:
// - Serving frontend static files from the backend, which is useful when building a single-page application with React, Angular, etc.
// - Redirecting unhandled requests (e.g., all requests not matching a defined API route) to the frontend's index.html. This allows the frontend to handle client-side routing.

// When to enable it:
// It depends on your project and its structure. If you are developing a single-page application, you'll enable these sections when you are ready to deploy your project to production.

// To enable production configuration:
// 1. Uncomment the lines related to serving static files and redirecting unhandled requests.
// 2. Ensure that the `reactBuildPath` points to the correct directory where your frontend's build artifacts are located.

const reactBuildPath = `${__dirname}/../../frontend/dist`;

// serve react resources

app.use(express.static(reactBuildPath));

// redirect unhandled requests to the react index file

app.get("*", (req, res) => {
  res.sendFile(`${reactBuildPath}/index.html`);
});

/* ************************************************************************* */

module.exports = app;
