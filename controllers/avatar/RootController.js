module.exports = (req, res) => {
    const validIds = process.env.ID_WHITELIST.split(";");
    return res.json(validIds);
};