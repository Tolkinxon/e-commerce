const { sign, verify } = require('jsonwebtoken');
const serverConfig = require('../config');
const { TOKEN_KEY } = serverConfig;

const tokenService = {
    creatToken: (payload) => sign(payload, TOKEN_KEY),
    verifyToken: (token) => verify(token, TOKEN_KEY) 
}

module.exports = tokenService;