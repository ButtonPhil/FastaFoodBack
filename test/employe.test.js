import request from 'supertest'
import { describe, it, beforeAll, expect, afterEach } from 'vitest'
import app from "../index.js";

let token;
let emailasupp = [];

describe('test route employee', () => {
    // test et recuperation du token 
    beforeAll(async () => {
        //arrange: préparation de données valides
        const data = {
        email : 'flo@maxime',
        password : '1111',
        }

        //act : envoi de la requete de connexion avec les donnees 
        const resultat = await request(app)

            //envoie de la requete de connexion avec les donnees
            .post('/fastafood/login')

            //excution de la requete
            .send(data)

            // console.log(resultat)

        //assert : verification du statut de la reponse
        expect(resultat.statusCode).toBe(200);
        expect(resultat.body.token).toBeDefined();
        token = resultat.body.token

    })

    //supprime tout les employe cree pendant les test
    afterEach(async () => {

        if (emailasupp.length > 0) {

            const findEmploye = await request(app)

                .get('/fastafood/employ')
                .set('Authorization', `${token}`)

            const allUser = findEmploye.body.employ;
             console.log(allUser);
            

            for (const email of emailasupp) {

                const user = allUser.find((index) => index.email === email);

                if (user) {

                    await request(app)
                    .delete(`/fastafood/deleteEmploy/${user.id}`)
                    .set('Authorization', `${token}`)

                }

            }

            emailasupp = [];

        }

    })

    // test recuperation des employes 
    it('doit retourner la liste des employes', async () => {

        const allEmploye = await request(app)
            .get('/fastafood/employ')
            .set('Authorization', `${token}`)

        expect(allEmploye.statusCode).toBe(200)
    })

    it('doit creer un employe', async () => {

        //arrange creation d'employer
        const newEmploye = {

            lastName: "bazooka",
            firstName: "fatal",
            email: "tacagoule@test",
            password: "1111",
            role: "employ"

        };

        //act
        const createEmploye = await request(app)

            .post('/fastafood/createEmploy')
            .send(newEmploye)

        //assert 
        expect(createEmploye.statusCode).toBe(200);
        emailasupp.push(createEmploye.email);

    })


})