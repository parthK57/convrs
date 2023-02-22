import { Router } from "express";

const router = Router();

// SERVICES
import APIVerifier from "../Services/APIVerifier";
import AccountVerifier from "../Services/AccountVerifier";

// CONTROLLERS
import { createGroupHandler, getGroupsHandler, sendGroupMessageHandler, joinGroupHandler, getGroupMessageHandler, removeMemberHandler } from "../controllers/groups";

// ROUTES
router.post("/groups/create", APIVerifier, AccountVerifier, createGroupHandler);
router.get("/groups/get", APIVerifier, AccountVerifier, getGroupsHandler);
router.post("/groups/messages/send", APIVerifier, AccountVerifier, sendGroupMessageHandler);
router.get("/groups/messages/get", APIVerifier, AccountVerifier, getGroupMessageHandler);
router.post("/groups/join", APIVerifier, AccountVerifier, joinGroupHandler);
router.delete("/groups/remove", APIVerifier, AccountVerifier, removeMemberHandler);

export default router;
