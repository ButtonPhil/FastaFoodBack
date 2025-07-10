import express from 'express';
import checkToken from "../middlewares/auth.js";
import { register, getEmploy, updateEmploy, deleteEmploy, login } from '../controllers/userController.js';


const router = express.Router();

router.post('/employ', checkToken, register)


router.get('/employ',checkToken, getEmploy)


router.put('/employ/:idEmploy',checkToken, updateEmploy)


router.delete('/employ/:idEmploy',checkToken, deleteEmploy)

router.post('/login', login);
    













export default router;