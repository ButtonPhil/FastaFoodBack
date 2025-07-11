import bdd from '../configuration/db.js';

//  requette creation dans la base de donner de l'employer
export const addUser = (lastName, firstName, role, email, cryptPass) => {

    console.log("je suis dans le modèle");
    const addEmploy = "INSERT INTO Employ (lastName, firstName, role, email, password) value (?,?,?,?,?)";

    return bdd.query(addEmploy, [lastName, firstName, role, email, cryptPass]);

}


export const employGet = () => {

    const listEmploy = "SELECT idEmploy, lastName, firstName, role from employ ";

    return bdd.query(listEmploy)
}


export const employUpdate = (lastName, firstName, role, userId) => {

    const upEmploy = "UPDATE employ SET lastName = ?, firstName = ?, role = ? where idEmploy = ?;";

    return bdd.query(upEmploy, [lastName, firstName, role, userId])

}


export const employDelete = (userId) => {

    const deleteEmp = "DELETE FROM employ WHERE idEmploy = ?";

    return bdd.query(deleteEmp, [userId]);

}

export const loginEmploy = (email) => {
    
    const selectEmploy = "SELECT idEmploy, lastName, password, role from employ where email like ?;";

    return bdd.query(selectEmploy, [email]);

}

export const getProfileUser = (userId) => {
    
    const getProfile = "SELECT idEmploy, name, mail FROM users WHERE idUser = ?;";

    // Exécute la requête de sélection avec l'ID utilisateur fourni
    return bdd.query(getProfile, [userId]);

}


export const updateUserProfile = (lastName, email, userId) => {

    const updateUser = "UPDATE employ SET lastName = ?, email = ? WHERE idEmploy = ?;";
    
    return bdd.query(updateUser, [lastName, email, userId]);

}

export const getUserPassword = (idUser) => {

    const selectUser = "SELECT password FROM employ WHERE idEmploy = ?;";

    return bdd.query(selectUser, [idUser])

}

export const updateUserPassword = (cryptedNewPassword, userId) => {
     // préparation de la requete de mise à jour
    const updatePassword = "UPDATE employ SET password = ? WHERE idEmploy = ?;";

    // Exécute la requête de mise à jour avec le nouveau mot de passe et l'ID utilisateur
    return bdd.query(updatePassword, [cryptedNewPassword, userId]);

}