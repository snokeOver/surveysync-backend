import express from "express";
import { test } from "../dbOperations/helper/test.js";
import { createUser } from "../dbOperations/createUser.js";
import { checkEamilExist } from "../dbOperations/checkEmailExists.js";
import { createToken } from "../dbOperations/authentication/createToken.js";
import { createSurvey } from "../dbOperations/createASurvey.js";
import { getSurveyorsSurveys } from "../dbOperations/getSurveyorSurveys.js";
import { deleteASurvey } from "../dbOperations/deleteSurvey.js";
import { updateASurvey } from "../dbOperations/updateASurvey.js";
import { getRecentSurveys } from "../dbOperations/getRecentSurveys.js";
import { getASurveyDetails } from "../dbOperations/getASurveyDetails.js";
import { updateASurveyResponse } from "../dbOperations/updateASurveyResponse.js";
import { getASurveyResponseDetails } from "../dbOperations/getASurveyResponseDetails.js";
import { getUserRole } from "../dbOperations/getUserRole.js";
import { getATotalSurveyResponse } from "../dbOperations/getATotalSurveyResponse.js";
// import { updateExistingDoc } from "../dbOperations/updateExistingDoc.js";

// Initiate router
const router = express.Router();

// --------------------  Get operations-----------------------------//
//API test
router.get("/test", test);

// Get all the surveys that created by a specific surveyor
router.get("/surveys/:sid", getSurveyorsSurveys);

// Get 6 recently published surveys
router.get("/recent-surveys", getRecentSurveys);

// Get a  survey response based on the id
router.get("/survey-response/:id", getATotalSurveyResponse);

// Get a survey details from surveyModel based on the id
router.get("/single-survey/:id", getASurveyDetails);

// Get a  survey details from surveyResponseModel based on the id
router.get("/user-survey-response/:id", getASurveyResponseDetails);

// Get a  user role
router.get("/user-role/:id", getUserRole);

// ------Danger---- Update field in existing database
// router.get("/update", updateExistingDoc);

// --------------------  Post Operations ----------------------------//
//Check if the Email is already in the DB or not
router.post("/check-email", checkEamilExist);

// if Exist do nothing, or Create user with user info
router.post("/create-user", createUser);

// Create token and send with user request
router.post("/jwt", createToken);

// Create a survey
router.post("/create-survey", createSurvey);

// --------------------  Delete Operations-------------------------//
// Delete a specific survey data by id requested by surveyor
router.delete("/survey/:id", deleteASurvey);

// --------------------  Update(patch) Operations-------------------//
// Update a specific survey data by id requested by surveyor
router.patch("/survey/:id", updateASurvey);

// Update a specific survey response data
router.patch("/survey-response/:id", updateASurveyResponse);

export default router;
