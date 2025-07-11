import dotenv from "dotenv";
import * as orderModel from "../models/orderModel.js"







export const getOrder = async (req, res) => {

    try {

        const [result] = await orderModel.orderGet();

        res.status(201);
        res.json({

            message: "affiche ticket",
            ticket: result

        });

    } catch (error) {

        res.status(400).json({ message: "erreur affichage ticket", error })
        console.log(error);

    }

}

export const registerOrder = async (req, res) => {

    console.log("je suis dans le controller");

    // const productsId = req
    const { status, total, quantity, type, unitPrice} = req.body;
    
    try {

        await orderModel.addOrder(status, total, type);
        await orderModel.addProdOrder (quantity, unitPrice, productsId)

        res.status(201).json({ message: "Commande valider" });

    } catch (error) {

        res.status(400).json({ message: "erreur lors de la validation de la commande", error })
        console.log(error);

    }

}

export const orderDelete = async (req, res) => {

    const userRole = req.user.userRole;
    const idOrder = req.body.idOrder
    const orderId = req.oder.idOder;

    try {

        if (userRole === "admin") {

            await orderModel.deleteOrder(idOrder);
            await orderModel.deleteProdOrder(orderId);
            res.status(200).json({ message: "Suppression ticket de la commande" });

        } else {

            res.status(403).json({ message: "accès refusé" });

        }

    } catch (error) {

        res.status(400).json({ message: "erreur lors de la suppression du ticket de la commande", error })
        // console.log(error);

    }

}