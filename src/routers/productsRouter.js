import { Router } from 'express';
import { createProduct, getAll , getDetail, remove, update } from '../Controllers/products.js';


const routerProducts = Router();

routerProducts.get("/", getAll);
routerProducts.get("/:id", getDetail);
routerProducts.post("/", createProduct);
routerProducts.put("/:id", update);
routerProducts.delete("/:id", remove);

export default routerProducts;