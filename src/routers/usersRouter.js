import { Router } from 'express';
import { create, getAll, getDetail, remove, update } from '../Controllers/users.js';
const routerUsers = Router();

routerUsers.get("/", getAll);
routerUsers.get("/:id", getDetail);
routerUsers.post("/", create);
routerUsers.put("/:id", update);
routerUsers.delete("/:id", remove);

export default routerUsers;