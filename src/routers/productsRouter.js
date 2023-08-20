import { Router } from 'express';
import { createProduct, getAll , getDetail, remove, update } from '../Controllers/products.js';
import { checkPremission } from '../middlewares/checkPermission.js';


const routerProducts = Router();

routerProducts.get("/", getAll);
routerProducts.get("/:id", getDetail);
routerProducts.post("/", checkPremission, createProduct);
routerProducts.put("/:id", checkPremission, update);
routerProducts.delete("/:id", checkPremission, remove);

export default routerProducts;