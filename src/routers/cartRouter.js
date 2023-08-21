import { Router } from 'express';
import { create, getAll, remove } from '../Controllers/cart.js';
const routerCarts = Router();

routerCarts.get("/:id", getAll);
routerCarts.post("/", create);
routerCarts.put("/", remove);

export default routerCarts;