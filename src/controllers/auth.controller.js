const { globalError, ClientError } = require('shokhijakhon-error-handler');
const { userValidator, loginValidator } = require('../utils/validator');
const hashingService = require('../lib/hash');
const tokenService = require('../lib/jwt');

module.exports = {
    REGISTER: async (req, res)=>{
        try{
            if(req.cookies.token) return res.redirect('index');

            const userData = req.body;
            let validate = userValidator.validate(userData, {abortEarly: true});
            if(validate.error) throw new ClientError(validate.error.message, 400);

            const users = await req.readFile('users');
            if(users.some(item => item.email == userData.email)) throw new ClientError('This user already excist', 400);

            const newUser = {id: users.length ? users.at(-1).id+1:1, ...userData, password: await hashingService.hashPassword(userData.password), createdAt: new Date().toLocaleDateString(), updatedAt: null}
            users.push(newUser);
            await req.writeFile('users', users);
            req.makeCookie('token', tokenService.creatToken({id: newUser.id, userAgent: req.headers['user-agent']})); 
            return res.redirect('index');
        }
        catch(error){
            globalError(error, res);
        } 
    },
    LOGIN: async (req, res)=>{
        try{
            if(req.cookies.token) return res.redirect('index');
            const loggedUser = req.body;
            let validate = loginValidator.validate(loggedUser, {abortEarly: true});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const users = await req.readFile('users');
            const foundUser = users.find(item => item.email == loggedUser.email);
            if(!foundUser) throw new ClientError('This user is not avialable', 400);
            const comparing = await hashingService.comparePassword(loggedUser.password, foundUser.password);
            if(!comparing) throw new ClientError('This user is not avialable', 400);

            req.makeCookie('token', tokenService.creatToken({id: foundUser.id, userAgent: req.headers['user-agent']})); 
            return res.redirect('index');
        }
        catch(error){
            globalError(error, res);
        } 
    }
}