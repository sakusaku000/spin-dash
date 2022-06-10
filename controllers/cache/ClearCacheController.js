const rimraf = require("rimraf");
const {mkdirSync} = require("fs");

module.exports = (req, res) => {
    console.log(`Clearing out cache...`);
    rimraf.sync(`${srcDir}/avatars`);
    mkdirSync(`${srcDir}/avatars`);
    return res.send("cleared cache!");
}