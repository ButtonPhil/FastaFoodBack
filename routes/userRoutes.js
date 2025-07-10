import express from 'express';
import checkToken from "../middlewares/auth.js";
import { register, getEmploy, updateEmploy, deleteEmploy, login, getProfile, updateProfile, updatePassword } from '../controllers/userController.js';


const router = express.Router();

router.post('/employ', register)

router.get('/employ',checkToken, getEmploy)

router.put('/employ/:idEmploy',checkToken, updateEmploy)

router.delete('/employ/:idEmploy',checkToken, deleteEmploy)

router.post('/login', login);
    
router.get('/profile', checkToken, getProfile);

router.put('/profile/update', checkToken, updateProfile);

router.put('/profile/password', checkToken, updatePassword);











export default router;