require("dotenv").config();
const {existsSync, mkdirSync} = require("fs");
const {CronJob} = require("cron");
const rimraf = require("rimraf");

const express = require("express");
const app = express();

app.enable("trust proxy");
app.use(express.json());

if (!existsSync(`${__dirname}/avatars`)) mkdirSync(`${__dirname}/avatars`);
global.srcDir = __dirname;

app.listen(process.env.PORT || 1994, () => {
    console.log(`Listening on ${process.env.PORT || 1994}...`);
});

app.use("*", (req, res, next) => {
    console.log(`${req.ip}: accessed ${req.originalUrl}`);
    next();
});

app.use("/", require(`${__dirname}/routes/root.js`));
app.use("/avatar", require(`${__dirname}/routes/avatar.js`));
app.use("/cache", require(`${__dirname}/routes/cache.js`));

new CronJob("0 0 * * *", () => {
    console.log(`Clearing out cache...`);
    rimraf.sync(`${srcDir}/avatars`);
    mkdirSync(`${srcDir}/avatars`);
}).start();