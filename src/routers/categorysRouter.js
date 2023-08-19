import { Router } from 'express';
import { create, getAll, getDetail, remove, update } from '../Controllers/categories.js';
const routerCategories = Router();

routerCategories.get("/", getAll);
routerCategories.get("/:slug", getDetail);
routerCategories.post("/", create);
routerCategories.put("/:id", update);
routerCategories.delete("/:id", remove);

export default routerCategories;