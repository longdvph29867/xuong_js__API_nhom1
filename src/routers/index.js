import { Router } from 'express';
import routerAuth from './authRouter.js';
import routerCarts from './cartRouter.js';
import routerCategories from './categoryRouter.js';
import routerUploadImages from './uploadImagesRouter.js';
import routerUsers from './usersRouter.js';
import routerProducts from './productsRouter.js';

const router = Router();

router.use("/categories", routerCategories);
router.use("/user", routerUsers);
router.use("/auth", routerAuth);
router.use("/products", routerProducts);
router.use("/images", routerUploadImages);
router.use("/cart", routerCarts);



export default router;