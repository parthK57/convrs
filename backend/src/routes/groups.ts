import { Router } from "express";

const router = Router();

// SERVICES
import APIVerifier from "../Services/APIVerifier";
import AccountVerifier from "../Services/AccountVerifier";

// CONTROLLERS
import { createGroupHandler } from "../controllers/groups";

// ROUTES
router.post("/groups/create", APIVerifier, AccountVerifier, createGroupHandler);

export default router;
