import { Router } from 'express';
import { create, getAll } from '../Controllers/cart.js';
const routerCarts = Router();

routerCarts.get("/:id", getAll);
routerCarts.post("/", create);

export default routerCarts;