const fs = require('fs/promises');
const serverConfig = require('../config');
const { dbPath } = serverConfig;

function model(req, res, next){
    req.readFile = async (fileName) => {
        let data = await fs.readFile(dbPath(fileName), 'utf-8');
        return data ? JSON.parse(data) : []
    }

    req.writeFile = async (fileName, data) => {
        await fs.writeFile(dbPath(fileName), JSON.stringify(data, null, 4));
        return true
    }
    req.makeCookie = async (key, data) => {
        res.cookie(key, data, {http: true, maxAge: 24*60*60*1000, sameSite: "strict", secure: process.env.NODE_ENV == 'production'});
        return true;
    }

    return next();
}

module.exports = model;