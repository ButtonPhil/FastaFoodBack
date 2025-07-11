import bdd from '../configuration/db.js';




export const orderGet = () => {

    const affichageOrder = "SELECT createDate, status, total, quantity, unitPrice, productName join productsOrder on idOrder = orderId join products on productsId = idProducts from order ";

    return bdd.query(affichageOrder)
}

export const addOrder = (status, total, type) => {

    // console.log("je suis dans le modèle");
    const addOrder = "INSERT INTO order (status, total, type) value (?,?,?)";

    return bdd.query(addOrder, [status, total, type]);
 
}

export const addProdOrder  = (quantity, productsId) => {

    // console.log("je suis dans le modèle");
    const addProdOrder = "INSERT INTO productsOder (quantity, productsId, orderId) value (?,?,?)";

    return bdd.query(addProdOrder, [quantity, productsId]);

}

export const deleteOrder = (idOrder) => {

    const deleteOrder = "DELETE FROM order WHERE idOrder = ?";

    return bdd.query(deleteOrder, [idOrder]);

}

export const deleteProdOrder = (orderId) => {

    const deleteProdOrder = "DELETE FROM order WHERE idOrder = ?";

    return bdd.query(deleteProdOrder , [orderId]);

}