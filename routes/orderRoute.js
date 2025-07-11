import express from 'express';
import { getOrder, orderDelete, registerOrder } from '../controllers/OrderController.js';




const router = express.Router();

router.get('/order', getOrder)

router.post('/order', registerOrder)

router.delete('/order/delete', orderDelete)








export default router;