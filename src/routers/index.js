import { Router } from 'express';
import routerAuth from './authRouter.js';
import routerCategories from './categorysRouter.js';
import routerUploadImages from './uploadImagesRouter.js';
import routerUsers from './usersRouter.js';

const router = Router();

router.use("/categories", routerCategories);
router.use("/user", routerUsers);
router.use("/auth", routerAuth);
router.use("/images", routerUploadImages);

export default router;