import { Router } from "express";
import { register, login, logout } from "../../controllers/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

export default router;
