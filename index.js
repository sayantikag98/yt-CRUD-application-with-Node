import bodyParser from "body-parser";
import express from "express";
import chalk from "chalk";
import routes from "./routes/users.js";


const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // to use .json data for the application
// app.use() is a middleware

app.use("/users", routes);

app.get("/", (req, res) => res.send("Home Page"));

app.listen(PORT, () => {
    console.log(chalk.yellow.inverse(`Starting to listen to request from http://localhost:${PORT} ...`));
});

