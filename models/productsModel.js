import bdd from '../configuration/db.js';


export const addProduct = (productName, category, unit, quantityStock, minimumThreshold) => {

    // console.log("je suis dans le modèle");
    const addProd = "INSERT INTO products (productName, category, unit, quantityStock, minimumThreshold) value (?,?,?,?,?)";

    return bdd.query(addProd, [productName, category, unit, quantityStock, minimumThreshold]);

}

export const productsGet = () => {

    const listProducts = "SELECT productName, category, unit, quantityStock, minimumThreshold from products ";

    return bdd.query(listProducts)
}

export const productsUpdate = (idProduct, productName, category, unit, quantityStock, minimumThreshold) => {

    const upProducts = "UPDATE products SET productName = ?, category = ?, unit = ?, quantityStock = ?, minimumThreshold = ? where idProduct = ?;";

    return bdd.query(upProducts, [idProduct, productName, category, unit, quantityStock, minimumThreshold])

}

export const deleteProduct = (idProduct) => {

    const deleteProd = "DELETE FROM products WHERE idProduct = ?";

    return bdd.query(deleteProd, [idProduct]);

}