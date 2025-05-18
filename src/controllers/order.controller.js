const { globalError } = require('shokhijakhon-error-handler');

module.exports = {
    CHANGE: async (req, res)=>{
        try{
            const id = req.params.id;
            const condition = req.params.condition;
            const orderedProducts = await req.readFile('orderedProducts');
            const products = await req.readFile('products');

            
            if(condition == 1) {
                const foundOrder = orderedProducts.find(item => item.orderedProduct_id == id);
                const indexFoundOrder = orderedProducts.findIndex(item => item.orderedProduct_id == id);
                const foundProduct = products.find(item => item.id == id);
                if(!foundOrder) {
                    const newOrder = {id: orderedProducts.length?orderedProducts.at(-1).id+1:1, orderedProduct_id: id, orderedProductName: foundProduct.name, amount:1, allPrice: foundProduct.price}
                    orderedProducts.push(newOrder);
                    await req.writeFile('orderedProducts', orderedProducts);
                    // orderedProducts.reduce((item)=> item.allPrice)
                    return res.status(201).json({message: 'This item successfully ordered', status: 201})
                } else {
                    orderedProducts[indexFoundOrder].amount = orderedProducts[indexFoundOrder].amount + 1
                    orderedProducts[indexFoundOrder].allPrice = orderedProducts[indexFoundOrder].allPrice + foundProduct.price
                    await req.writeFile('orderedProducts', orderedProducts);
                    return res.status(201).json({message: 'This item successfully changed', status: 201})
                }
            } else {
                const foundOrder = orderedProducts.find(item => item.id == id);
                const indexFoundOrder = orderedProducts.findIndex(item => item.id == id);
                const foundProduct = products.find(item => item.id == foundOrder.orderedProduct_id);

                if(orderedProducts[indexFoundOrder].amount == 1) {
                    orderedProducts.splice(indexFoundOrder, 1);
                    await req.writeFile('orderedProducts', orderedProducts);
                    return res.status(201).json({message: 'This item successfully removed', status: 201})
                }

                orderedProducts[indexFoundOrder].amount = orderedProducts[indexFoundOrder].amount - 1;
                orderedProducts[indexFoundOrder].allPrice = orderedProducts[indexFoundOrder].allPrice - foundProduct.price;
                await req.writeFile('orderedProducts', orderedProducts);
                return res.status(201).json({message: 'This item successfully changed', status: 201})
            }
        }
        catch(error){
            globalError(error, res);
        }
    }
}