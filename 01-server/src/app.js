const express=require ("express")
const productManager = require("./ProductManager")

const PORT=8080

const app=express()


/* const pm=new productManager("./rutaBDProducto.json") */

app.get("/",(req, res)=>{
    res.send("Tienda online")
})

app.get("/products", (req, res)=>{
    let limit=req.query.limit
    let products= productManager.getProducts();
    
    if (limit && isNaN(limit)){
        limit=parseInt(limit)
        products=products.slice(0, limit)
    }
    res.json(products)
})

app.get("/products/:pid", (req, res)=>{
    const productId=parseInt(req.params.pid)
    const product= productManager.getProductsByid(productId)
    
    if (product){
        res.json(product)
    }else{
        res.status(404).json({
            error: "Producto no encontrado"
        })
    }
})

app.listen(PORT, ()=>{
    console.log("server funcionando")
})
