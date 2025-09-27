import express from "express";
import cors from "cors";
import mysql from "mysql2";
import studentsRouter from "../src/routes/student.route.js";
import mealRouter from "../src/routes/meal.route.js";
import session from "express-session";
import dashboardRouter from "../src/routes/dashboard.route.js";

const app = express();
app.use(cors({
  origin : "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(
  session({
    name: 'saif',
    secret: "bxc",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const db = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "roommates_db",
    dateStrings: true,
  })
  .promise();

app.listen(3000, () => console.log("server is running at port 3000."));

app.use("/students", studentsRouter);
app.use("/meals", mealRouter);
app.use("/",dashboardRouter);

export { db };
