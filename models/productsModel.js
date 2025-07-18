import bdd from '../configuration/db.js';


export const addProduct = (productName, category, unit, quantityStock, minimumThreshold) => {

    // console.log("je suis dans le modèle");
    const addProd = "INSERT INTO products (productName, category, unit, quantityStock, minimumThreshold, unitPrice) value (?,?,?,?,?,?)";

    return bdd.query(addProd, [productName, category, unit, quantityStock, minimumThreshold]);

}

export const productsGet = () => {

    const listProducts = "SELECT idProduct, productName, category, unit, quantityStock, minimumThreshold , unitPrice from products ";

    return bdd.query(listProducts)
}

export const productsUpdate = (idProduct, category, unit, quantityStock, minimumThreshold, unitPrice) => {

    console.log(idProduct, category, unit, quantityStock, minimumThreshold);

    const upProducts = "UPDATE products SET productName = ?, category = ?, unit = ?, quantityStock = ?, minimumThreshold = ?, unitPrice = ?  where idProduct = ?";

    
    const response =  bdd.query(upProducts, [ category, unit, quantityStock, minimumThreshold, unitPrice, idProduct]);

    console.log(response);

     return response;
}

export const deleteProduct = (idProduct) => {

    const deleteProd = "DELETE FROM products WHERE idProduct = ?";

    return bdd.query(deleteProd, [idProduct]);

}

export const profileProdGet = (idProduct) => {

    const listProducts = "SELECT productName, category, unit, quantityStock, minimumThreshold , unitPrice from products where idProduct = ?";

    return bdd.query(listProducts, [idProduct])
}
