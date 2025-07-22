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

        await userModels.addUser(lastName, firstName, role, email, cryptPass);

        res.status(200).json({ message: "utilisateur créé" });

    } catch (error) {

        res.status(400).json({ message: "erreur lors de l'inscription", error })
        // console.log(error);

    }

}

export const getEmploy = async (req, res) => {

    try {

        const [result] = await userModels.employGet();

        res.status(200);
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

    const userId = req.params;
    const userRole = req.user.userRole

    const { lastName, firstName, role } = req.body;

    try {

        if (userRole === "admin") {

            await userModels.employUpdate(lastName, firstName, role, userId);
            res.status(200).json({ message: " Modification effectuer" })

        } else {

            res.status(403).json({ message: "accès refusé" });

        }

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la modification", error });
        console.log(error);

    }

}

export const deleteEmploy = async (req, res) => {

    const userId = req.params.idEmploy

    // console.log(userId)

    try {

        await userModels.employDelete(userId);
        res.status(200).json({ message: "Suppression faite" });

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la suppression", error });
        console.log(error);

    }

}


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // appel de la fonction loginUser du modèle userModels
        // cette fonction permet de récupérer les données de l'utilisateur à partir de son mail
        const [result] = await userModels.loginEmploy(email);

        const employData = result[0];

        if (result) {

            const checkPassword = await bcrypt.compare(password, employData.password);
            // console.log(checkPassword);

            if (checkPassword == true) {

                // création du token
                const token = jwt.sign({ idEmploy: employData.idEmploy, username: employData.lastName, userRole: employData.role }, process.env.SECRET_KEY, { expiresIn: "6h" });

                res.status(200).json({
                    message: "connexion autorisé",
                    token: token
                });
            } else {
                res.status(403).json({ message: "accès refusé" });
            }

        } else {
            res.status(104).json({ message: "utilisateur inconnu" })
        }

    } catch (error) {

        res.status(500).json({ error })
        console.log(error);

    }

}

export const getProfile = async (req, res) => {
    // récupération de l'id de l'utilisateur à partir du token grace à user
    // le token est vérifié par le middleware checkToken
    const userId = req.user.idEmploy

    try {

        const [result] = await userModels.getProfileUser(userId);

        if (result.length > 0) {

            res.status(200).json(result[0]);

        } else {

            res.status(404).json({ message: "utilisateur non trouvé" });
        }

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la récupération du profil", error });
        console.log(error);

    }

}

export const updateProfile = async (req, res) => {
    // récupération de l'id de l'utilisateur à partir du token
    const userId = req.user.idEmploy;


    // récupération des informations à mettre à jour
    const email = req.body.email;



    try {
        // utilisation de la connexion bdd pour executer la requete
        await userModels.updateUserProfile(email, userId);
        // envoi de la réponse
        res.status(200).json({ message: "profil mis à jour" });

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la mise à jour du profil", error });
        console.log(error);

    }

}

export const updatePassword = async (req, res) => {

    // récupération de l'id de l'utilisateur à partir du token
    const userId = req.user.idEmploy;

    // récupération des informations à mettre à jour
    const { oldPassword, newPassword } = req.body;

    try {
        // récupération de l'utilisateur pour vérifier l'ancien mot de passe
        const [result] = await userModels.getUserPassword(userId);

        if (result.length > 0) {

            const userData = result[0];
            
            // vérification de l'ancien mot de passe
            const checkOldPassword = await bcrypt.compare(oldPassword, userData.password);

            if (checkOldPassword) {
                // cryptage du nouveau mot de passe
                const cryptedNewPassword = await bcrypt.hashSync(newPassword, 10);
                // utilisation de la connexion bdd pour executer la requete
                await userModels.updateUserPassword(cryptedNewPassword, userId);
                res.status(200).json({ message: "mot de passe mis à jour" });

            } else {

                res.status(403).json({ message: "ancien mot de passe incorrect" });

            }
        } else {

            res.status(404).json({ message: "utilisateur non trouvé" });

        }

    } catch (error) {

        res.status(500).json({ message: "erreur lors de la mise à jour du mot de passe", error });
        console.log(error);

    }
}