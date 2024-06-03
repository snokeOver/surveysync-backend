import express from "express";
import { test } from "../dbOperations/test.js";
import { createUser } from "../dbOperations/createUser.js";
import { checkEamilExist } from "../dbOperations/checkEmailExists.js";
import { createToken } from "../dbOperations/createToken.js";
import { createSurvey } from "../dbOperations/createASurvey.js";
import { getSurveyorsSurveys } from "../dbOperations/getSurveyorSurveys.js";
import { deleteASurvey } from "../dbOperations/deleteSurvey.js";
import { updateASurvey } from "../dbOperations/updateASurvey.js";

// Initiate router
const router = express.Router();

//API test
router.get("/test", test);

// if Exist do nothing, or Create user with user info
router.post("/create-user", createUser);

// Create token and send with user request
router.post("/jwt", createToken);

// Create a survey
router.post("/create-survey", createSurvey);

// Create all the surveys that created by a specific surveyor
router.get("/surveys/:sid", getSurveyorsSurveys);

// Delete a specific survey data by id requested by surveyor
router.delete("/survey/:id", deleteASurvey);

// Update a specific survey data by id requested by surveyor
router.patch("/survey/:id", updateASurvey);

//Check if the Email is already in the DB or not
router.post("/check-email", checkEamilExist);

export default router;
