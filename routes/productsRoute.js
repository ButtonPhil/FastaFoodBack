import express from 'express';
import { getProducts, productsDelete, registerProducts, updateProducts } from '../controllers/productsController.js';
import checkToken from '../middlewares/auth.js';





const router = express.Router();


router.post('/products', checkToken, registerProducts)

router.get('/products', checkToken, getProducts)

router.delete('/products/delete', productsDelete)

router.put('/products/:idProduct',checkToken, updateProducts)




export default router;