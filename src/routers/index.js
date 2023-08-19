import { Router } from 'express';
import routerCategories from './categorysRouter.js';

const router = Router();

router.use("/categories", routerCategories);

export default router;