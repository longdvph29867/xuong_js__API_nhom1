import { Router } from 'express';
import routerAuth from './authRouter.js';
import routerCategories from './categorysRouter.js';
import routerUsers from './usersRouter.js';
import routerProducts from './productsRouter.js';

const router = Router();

router.use("/categories", routerCategories);
router.use("/user", routerUsers);
router.use("/auth", routerAuth);
router.use("/products", routerProducts);

export default router;