import bdd from '../configuration/db.js';

//  requette creation dans la base de donner de l'employer
export const addUser = (lastName, firstName, role) => {

    console.log("je suis dans le modèle");
    const addEmploy = "INSERT INTO Employ (lastName, firstName, role) value (?,?,?)";


    return bdd.query(addEmploy, [lastName, firstName, role]);


}

//  requette creation dans la base de donner info employer 
export const addEmailUser = (email, cryptPass) => {

    const addLooper = "INSERT INTO looper (email, password) value (?,?)";

    return bdd.query(addLooper, [email, cryptPass])
}


export const employGet = () => {

    const listEmploy = "SELECT lastName, firstName, role from employ ";

    return bdd.query(listEmploy)
}


export const employUpdate = (lastName, firstName, role, idEmploy) => {

    const upEmploy = "UPDATE employ SET lastName = ?, firstName = ?, role = ? where idEmploy = ?;";

    return bdd.query(upEmploy, [lastName, firstName, role, idEmploy])
}


export const employDelete = (idEmploy) => {

    const deleteEmp = "DELETE FROM employ WHERE idEmploy = ?";

    return bdd.query(deleteEmp, [idEmploy]);

}

export const loginEmploy = (email) => {
    
    const selectEmploy = "SELECT idEmploy, lastName, password from looper join to employ on idLooper = looperId where mail like ?;";

    return bdd.query(selectEmploy, [email]);
}