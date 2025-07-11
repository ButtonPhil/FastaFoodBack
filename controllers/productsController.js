import dotenv from "dotenv";
import * as productsModel from "../models/productsModel.js";


dotenv.config();


export const registerProducts = async (req, res) => {

    console.log("je suis dans le controller");

    const { productName, category, unit, quantityStock, minimumThreshold } = req.body;
    
    try {

        await productsModel.addProduct(productName, category, unit, quantityStock, minimumThreshold);

        res.status(201).json({ message: "produit créé" });

    } catch (error) {

        res.status(400).json({ message: "erreur lors de l'ajout du produit", error })
        console.log(error);

    }

}

export const getProducts = async (req, res) => {

    try {

        const [result] = await productsModel.productsGet();

        res.status(201);
        res.json({

            message: "liste produits",
            produits: result

        });

    } catch (error) {

        res.status(400).json({ message: "erreur liste des produits", error })
        console.log(error);

    }

}

export const updateProducts = async (req, res) => {

    const idProduct = req.result.idProduct;
    const userRole = req.user.userRole;
    const { productName, category, unit, quantityStock, minimumThreshold } = req.body;
    
    try {

        if (userRole === "admin") {

            const response = await productsModel.productsUpdate( idProduct, productName, category, unit, quantityStock, minimumThreshold );
            res.status(200).json({ message: "Modification effectuer", response : response})

        } else {

            res.status(403).json({ message: "accès refusé" });

        }

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la modification", error });
        console.log(error);

    }

}

export const productsDelete = async (req, res) => {

    const userRole = req.user.role;
    const { idProduct } = req.body;

    try {

        if (userRole === "admin") {

            await productsModel.deleteProduct(idProduct);
            res.status(200).json({ message: "Suppression faite" });

        } else {

            res.status(403).json({ message: "accès refusé" });

        }

    } catch (error) {

        res.status(400).json({ message: "erreur lors de la suppression du produit", error })
        // console.log(error);

    }

}