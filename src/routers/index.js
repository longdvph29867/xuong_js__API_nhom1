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
<<<<<<< HEAD
router.use("/products", routerProducts);
=======
router.use("/images", routerUploadImages);
router.use("/cart", routerCarts);
>>>>>>> 289a9e6c1d7e879beaaabd89eea05d6814f0fa1b

export default router;