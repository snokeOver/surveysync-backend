import express from "express";
import { test } from "../dbOperations/test.js";
import { createUser } from "../dbOperations/createUser.js";
import { checkEamilExist } from "../dbOperations/checkEmailExists.js";
import { createToken } from "../dbOperations/createToken.js";

// Initiate router
const router = express.Router();

//API test
router.get("/test", test);

// Create user with user info
router.post("/create-user", createUser);

// Create token and send with user request
router.post("/jwt", createToken);

//Check if the Email is already in the DB or not
router.post("/check-email", checkEamilExist);

export default router;
