module.exports = (req, res, next) => {
    const key = process.env.API_KEY;
    if (req.headers.api_key !== key) return res.status(401).send();
    return next();
};