import { Router } from "express";

const router = Router();

// SERVICES
import APIVerifier from "../Services/APIVerifier";
import AccountVerifier from "../Services/AccountVerifier";

// CONTROLLERS
import {
  sendMessageHandler,
  getMessagesHandler,
} from "../controllers/messages";

// ROUTES
router.post("/messages/send", APIVerifier, AccountVerifier, sendMessageHandler);
router.get("/messages/get", APIVerifier, AccountVerifier, getMessagesHandler);

export default router;
