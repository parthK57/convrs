import { Router } from "express";

const router = Router();

// SERVICES
import APIVerifier from "../Services/APIVerifier";
import AccountVerifier from "../Services/AccountVerifier";

// CONTROLLERS
import {
  addFriendHandler,
  removeFriendHandler,
  getFriendsHandler,
} from "../controllers/friends";

// ROUTES
router.post("/friends/add", APIVerifier, AccountVerifier, addFriendHandler);
router.delete(
  "/friends/remove",
  APIVerifier,
  AccountVerifier,
  removeFriendHandler
);
router.get("/friends/get", APIVerifier, AccountVerifier, getFriendsHandler);

export default router;
