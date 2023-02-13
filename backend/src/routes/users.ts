import { Router } from "express";

const router = Router();

// Services
import APIVerifier from "../Services/APIVerifier";

// Controllers
import { signUpHandler, loginHandler } from "../controllers/users";

router.post("/users/signup", APIVerifier, signUpHandler);
router.post("/users/login", APIVerifier, loginHandler);

export default router;
