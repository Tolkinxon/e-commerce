const { globalError } = require('shokhijakhon-error-handler');

module.exports = {
    MAIN: async (req, res)=>{
        try{
            if(!req.cookies.token) return res.redirect('login');
            const products = await req.readFile('products');
            const orderedProducts = await req.readFile('orderedProducts');
            const sum = orderedProducts.reduce((acc, a)=> acc+=a.allPrice, 0);
            const sumProducts = orderedProducts.reduce((acc, a)=> acc+=a.amount, 0);
            return res.render('index', {products, orderedProducts, sum, sumProducts});
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