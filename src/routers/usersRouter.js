import { Router } from 'express';
import { getAll } from '../Controllers/users.js';
const routerUsers = Router();

routerUsers.get("/", getAll);

export default routerUsers;