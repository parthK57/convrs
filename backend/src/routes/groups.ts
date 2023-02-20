import { Router } from "express";

const router = Router();

// SERVICES
import APIVerifier from "../Services/APIVerifier";
import AccountVerifier from "../Services/AccountVerifier";

// CONTROLLERS
import { createGroupHandler, getGroupsHandler, sendGroupMessageHandler, joinGroupHandler } from "../controllers/groups";

// ROUTES
router.post("/groups/create", APIVerifier, AccountVerifier, createGroupHandler);
router.get("/groups/get", APIVerifier, AccountVerifier, getGroupsHandler);
router.post("/groups/messages/send", APIVerifier, AccountVerifier, sendGroupMessageHandler);
router.post("/groups/join", APIVerifier, AccountVerifier, joinGroupHandler);

export default router;
