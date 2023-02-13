import { Router } from "express";

const router = Router();

// SERVICES
import APIVerifier from "../Services/APIVerifier";
import AccountVerifier from "../Services/AccountVerifier";

// CONTROLLERS
import { addFriendHandler, removeFriendHandler } from "../controllers/friends";

// ROUTES
router.post("/friends/add", APIVerifier, AccountVerifier, addFriendHandler)
router.delete("/friends/remove", APIVerifier, AccountVerifier, removeFriendHandler);

export default router;
