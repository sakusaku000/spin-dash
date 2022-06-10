module.exports = (req, res) => {
    return res.sendFile(`${srcDir}/default.png`);
};