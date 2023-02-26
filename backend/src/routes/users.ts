import { Router } from "express";

const router = Router();

// Services
import APIVerifier from "../Services/APIVerifier";

// Controllers
import {
  signUpHandler,
  loginHandler,
  resetPasswordRequestHandler,
  resetPasswordFormHandler,
  resetPasswordFormProcessHandler,
} from "../controllers/users";

router.post("/users/signup", APIVerifier, signUpHandler);
router.post("/users/login", APIVerifier, loginHandler);
router.get("/users/reset", APIVerifier, resetPasswordRequestHandler);
router.get("/users/reset/form", resetPasswordFormHandler);
router.get("/users/reset/form/process", resetPasswordFormProcessHandler);

export default router;
