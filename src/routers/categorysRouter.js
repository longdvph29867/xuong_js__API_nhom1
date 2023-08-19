import { Router } from 'express';
import { create, getAll, getDetail, remove, update } from '../Controllers/categories.js';
import { checkPremission } from '../middlewares/checkPermission.js';
const routerCategories = Router();

routerCategories.get("/", getAll);
routerCategories.get("/:slug", getDetail);
routerCategories.post("/", checkPremission, create);
routerCategories.put("/:id", checkPremission, update);
routerCategories.delete("/:id", checkPremission, remove);

export default routerCategories;