const {get} = require("axios");
const {existsSync} = require("fs");
const download = require("image-downloader");

module.exports = async (req, res) => {
    const userID = req.params.id;
    const validIds = process.env.ID_WHITELIST.split(";");

    if (!validIds.includes(userID)) return res.sendFile(`${srcDir}/default.png`);

    if (existsSync(`${srcDir}/avatars/${userID}.png`)) {
        console.log(`fetched from cache: ${userID}`)
        return res.sendFile(`${srcDir}/avatars/${userID}.png`);
    } else {
        try {
            console.log(`requesting avatar from discord: ${userID}`);
            const avatarRequest = await get(`https://discord.com/api/v9/users/${userID}`, {headers:{"Authorization": `Bot ${process.env.DISCORD_TOKEN}`}});
            if (avatarRequest.data.avatar) {
                download.image({
                    url:`https://cdn.discordapp.com/avatars/${userID}/${avatarRequest.data.avatar}.png?size=256`,
                    dest:`${srcDir}/avatars/${userID}.png`
                }).then(({filename}) => {
                    console.log(`fetched avatar from discord and serving: ${userID}`);
                    return res.sendFile(filename);
                }).catch((err) => {
                    console.error(err);
                    return res.sendFile(`${srcDir}/default.png`);
                });
            } else {
                return res.sendFile(`${srcDir}/default.png`);
            };
        } catch (err) {
            console.error(err);
            return res.sendFile(`${srcDir}/default.png`);
        };
    };
};