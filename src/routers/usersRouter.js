import { Router } from 'express';
import { create, getAll, getDetail, remove, update } from '../Controllers/users.js';
import { checkPremission } from '../middlewares/checkPermission.js';
const routerUsers = Router();

routerUsers.get("/", getAll);
routerUsers.get("/:id", getDetail);
routerUsers.post("/", checkPremission, create);
routerUsers.put("/:id", checkPremission, update);
routerUsers.delete("/:id", checkPremission, remove);

export default routerUsers;