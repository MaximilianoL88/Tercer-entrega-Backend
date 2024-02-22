const fs= require ("fs")

//Esta función la utilizamos despues cuando filtarmos por id lo que vamos a mofificar
const modificar=(prop, value)=>{
    if(prop==="description" ||prop==="title" ){
        return value.toUpperCase()
    }
    return value
}

//definimos la ruta
let ruta="./01-server/src/rutaBDProducto.json"

class productManager {
    constructor(){
        this.products=[]
        this.path=ruta
    }
    
    addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock ){
            console.log("Todos los campos deben estar completos, verifique por favor!!!\n\n")
        }

        let existe=this.products.find(prod=>prod.code===code)
        if(existe){
            console.log(`El producto con codigo ${code} ya existe \n\n`)
        }
        else{
            return []
        }

        let id=1
        if(this.products.length>0){
            id=this.products[this.products.length-1].id + 1
        }
        let nuevoProducto={id, title, description, price, thumbnail, code, stock}
        this.products.push(nuevoProducto)
        //generamos el archivo con nuestro array de produsctos pasado a string
        fs.writeFileSync(ruta, JSON.stringify(this.products, null, 2))
    }
    //leemos el archivo generado y lo devolvemos en formato array 
    getProducts(){
        this.products=JSON.parse(fs.readFileSync(ruta,{encoding:"utf8"}))
        console.log(this,this.products)
        return [this.products]
    }
    //leemos el archivo y devolvemos el objeto de nuestro array de acuerdo
    getProductsByid(id){
        let lecturaProductos=JSON.parse(fs.readFileSync(ruta,{encoding:"utf8"}))
        console.log(`Producto filtrado...:\n\n`,lecturaProductos[id -1]) 
        return[lecturaProductos[id]]  
    }  
    //modificamos alguna prop de el objeto elegido por su id y lo grabamos
    /* updateProduct(id){
        fs.writeFileSync(ruta, JSON.stringify(this.products[id], modificar , 2))
        console.log(`producto:\n\n ${id} con modificaciones guardado`)
    }  */
}

let pm= new productManager();
pm.addProduct("Papas","Patagonicas","2500","imagen1","001","10")
pm.addProduct("Papas","Noissette","3500","imagen2","002","8")
pm.addProduct("Papas","Mini","1900","imagen3","003","25")
pm.addProduct("Papas","Patagonicas","2500","imagen1","004","10")
pm.addProduct("Papas","Noissette","3500","imagen2","005","8")
pm.addProduct("Papas","Mini","1900","imagen3","006","25")
pm.addProduct("Papas","Patagonicas","2500","imagen1","007","10")
pm.addProduct("Papas","Noissette","3500","imagen2","008","8")
pm.addProduct("Papas","Mini","1900","imagen3","009","25")
pm.addProduct("Papas","Mini","1900","imagen3","010","25")

pm.getProducts()
pm.getProductsByid(5)
/* pm.updateProduct(7) */
module.exports=pm
