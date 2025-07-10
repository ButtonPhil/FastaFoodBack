import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModels from '../models/userModel.js';


dotenv.config();
// fonction cryptage et transimion des donner a userModel 
export const register = async (req, res) => {

    console.log("je suis dans le controller");

    const { email, password, lastName, firstName, role } = req.body;


    try {

        const cryptPass = await bcrypt.hash(password, 10);

        await userModels.addUser(lastName, firstName, role);
        await userModels.addEmailUser(email, cryptPass);

        res.status(201).json({ message: "utilisateur créé" });

    } catch (error) {

        res.status(400).json({ message: "erreur lors de l'inscription", error })
        // console.log(error);

    }
}

export const getEmploy = async (req, res) => {

    try {

        const [result] = await userModels.employGet();
        res.status(201);
        res.json({
            message: "liste employer",

            employ: result

        });

    } catch (error) {

        res.status(400).json({ message: "erreur liste employer", error })
        console.log(error);

    }

}



export const updateEmploy = async (req, res) => {


    const idEmploy = req.params.idEmploy

    const { lastName, firstName, role } = req.body;

    try {

        await userModels.employUpdate(lastName, firstName, role, idEmploy);
        res.status(200).json({ message: " Modification effectuer" })

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la modification", error });
        console.log(error);
    }
}

export const deleteEmploy = async (req, res) => {

    const idEmploy = req.params.idEmploy
    
    try {

        await userModels.employDelete(idEmploy);
        res.status(200).json({ message: "Suppression faite"});

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la suppression", error});
        console.log(error);

    }
}


export const login = async (req, res) => {

    const {email, password} = req.body;

    try{
        // appel de la fonction loginUser du modèle userModels
        // cette fonction permet de récupérer les données de l'utilisateur à partir de son mail
        const [result] = await userModels.loginEmploy(email);

        const employData = result[0];

        if (result){

            const checkPassword = await bcrypt.compare(password, employData.password);
            
            if (checkPassword == true){

                // création du token
                const token = jwt.sign({idUser: employData.idUser, username: employData.name}, process.env.SECRET_KEY, {expiresIn: "6h"});

                res.status(201).json({
                    message: "connexion autorisé",
                    token: token
                });
            } else {
                res.status(403).json({message: "accès refusé"});
            }

        } else {
            res.status(104).json({message: "utilisateur inconnu"})
        }

    } catch (error) {

        res.status(500).json({message: "erreur lors de la connexion", error})
        console.log(error);

    }
}