import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as productsModel from "../models/productsModel";


dotenv.config();

export const productsRegister = async (req, res) => {

    const { productsName, category, unit, quantiteStock, minimumTheshold } = req.body;

    try {

        

    } catch (error) {

        res.status(400).json({ message: "erreur lors de l'ajout du produit", error })
        // console.log(error);

    }

}