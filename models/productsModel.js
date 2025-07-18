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

export const productsUpdate = (idProduct, updatedCategory, updatedUnit,  updatedQuantityStock, updatedMinimumThreshold, updatedUnitPrice) => {

    console.log(idProduct, updatedCategory, updatedUnit,  updatedQuantityStock, updatedMinimumThreshold, updatedUnitPrice);

    const upProducts = "UPDATE products SET category = ?, unit = ?, quantityStock = ?, minimumThreshold = ?, unitPrice = ?  where idProduct = ?";

    
    const response =  bdd.query(upProducts, [ updatedCategory, updatedUnit,  updatedQuantityStock, updatedMinimumThreshold, updatedUnitPrice, idProduct]);

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
