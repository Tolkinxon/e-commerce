const { globalError } = require('shokhijakhon-error-handler');

module.exports = {
    MAIN: async (req, res)=>{
        try{
            if(!req.cookies.token) return res.redirect('login');
            return res.render('index');
        }
        catch(error){
            globalError(error, res);
        }
    },
    REGISTER_PAGE: async (req, res) => {
        try{
            if(req.cookies.token) return res.redirect('/');
            return res.render('register');
        }
        catch(error){
            globalError(error, res);
        }
    },
    LOGIN_PAGE: async (req, res) => {
        try{
            if(req.cookies.token) return res.redirect('/');
            return res.render('login');
        }
        catch(error){
            globalError(error, res);
        }
    }
}