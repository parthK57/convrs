import { Router } from "express";

const router = Router();

// SERVICES
import APIVerifier from "../Services/APIVerifier";
import AccountVerifier from "../Services/AccountVerifier";

// CONTROLLERS
import { addFriendHandler } from "../controllers/friends";

// ROUTES
router.post("/friends/add", APIVerifier, AccountVerifier, addFriendHandler)

export default router;
