const bcrypt = require('bcrypt');

const hashingService = {
    async hashPassword(password){
        return await bcrypt.hash(password, 10);
    },
    async comparePassword(password, hashPassword){
        return await bcrypt.compare(password, hashPassword);
    }
}
module.exports = hashingService;