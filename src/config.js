const c = require('config');
const path = require('path');

const serverConfig = {
    PORT: c.get('PORT') || 3000,
    dbPath: (fileName) => path.join(process.cwd(), 'db', fileName + '.json'),
    TOKEN_KEY: c.get('TOKEN_KEY')
}

module.exports = serverConfig;