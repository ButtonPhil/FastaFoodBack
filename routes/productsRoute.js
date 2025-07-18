import express from 'express';
import { getProducts, getProfilProd, productsDelete, registerProducts, updateProducts } from '../controllers/productsController.js';
import checkToken from '../middlewares/auth.js';





const router = express.Router();


router.post('/products', checkToken, registerProducts)

router.get('/products', checkToken, getProducts)

router.delete('/products/delete/:idProduct', checkToken, productsDelete)

router.put('/products/:idProduct',checkToken, updateProducts)

router.get('/profilProduct/:idProduct', checkToken, getProfilProd)


export default router;