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
import { getAllUsers } from "../dbOperations/getAllUsers.js";
import { updateAUserRole } from "../dbOperations/updateAUserRole.js";
import { getAllSurveys } from "../dbOperations/getAllSurveys.js";
import { updateASurveyStatus } from "../dbOperations/updateASurveyStatus.js";
import { getAdminFeedbacks } from "../dbOperations/getAdminFeedbacks.js";
import { getUsersParticipatedResponses } from "../dbOperations/getUsersParticipatedResponses.js";
import { getUsersReportedSurveys } from "../dbOperations/getUsersReportedSurveys.js";

// import { updateExistingDoc } from "../dbOperations/helper/updateExistingDoc.js";

// Initiate router
const router = express.Router();

// --------------------  Get operations-----------------------------//
//API test
router.get("/test", test);

// Get all the surveys that created by a specific surveyor
router.get("/surveyor-surveys/:sid", getSurveyorsSurveys);

// Get 6 recently published surveys
router.get("/recent-surveys", getRecentSurveys);

// Get a  survey response based on the surveyId
router.get("/survey-response/:uid", getATotalSurveyResponse);

// Get a  survey response based on the userId
router.get("/participated-surveys/:uid", getUsersParticipatedResponses);

// Get a  surveys I reported
router.get("/reported-surveys/:uid", getUsersReportedSurveys);

// Get a survey details from surveyModel based on the id
router.get("/single-survey", getASurveyDetails);

// Get a  survey details from surveyResponseModel based on the id
router.get("/user-survey-response/:uid", getASurveyResponseDetails);

// Get a  user role
router.get("/user-role/:id", getUserRole);

// Get admin feedbacks of a particular surveyor
router.get("/admin-feedbacks/:uid", getAdminFeedbacks);

// Get all users
router.get("/all-users/:uid", getAllUsers);

// Get all Surveys
router.get("/all-surveys/:uid", getAllSurveys);

// ------Danger---- Update field in existing database ---------------//
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

// Update a specific user role on userModel
router.patch("/update-user-role/:id", updateAUserRole);

// Update a specific survey Status on both SurveyModel and AdminFeedbackModel
router.patch("/update-survey-status/:id", updateASurveyStatus);

// Update a specific survey response data on both SurveyModel and SurveyResponseModel
router.patch("/survey-response/:id", updateASurveyResponse);

export default router;
