import { Router } from "express";

import Route_Login from "./login.js";
import Route_Register from "./register.js";

const router = Router();

router.post("/login", Route_Login);
router.post("/register", Route_Register);

export default router;