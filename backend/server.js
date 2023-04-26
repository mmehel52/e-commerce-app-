const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRoute");
const mongoSanitize = require("express-mongo-sanitize");
const passwordResetRouter = require("./routes/passwordResetRoute");
const cors = require("cors");
const passport = require("passport");
const authRouter = require("./routes/auth");
const session = require("express-session");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const uploadRouter = require("./routes/uploadRoutes");

dotenv.config();
require("./passport");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(
  cookieParser({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/password-reset", passwordResetRouter);
app.use("/api/upload", uploadRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
