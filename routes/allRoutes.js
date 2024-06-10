import express from "express";
import { test } from "../dbOperations/helper/test.js";
import { createUser } from "../dbOperations/postMethods/createUser.js";
import { checkEamilExist } from "../dbOperations/checkEmailExists.js";
import { createToken } from "../dbOperations/authentication/createToken.js";
import { createSurvey } from "../dbOperations/postMethods/createASurvey.js";
import { getSurveyorsSurveys } from "../dbOperations/getMethod/getSurveyorSurveys.js";
import { deleteASurvey } from "../dbOperations/deleteMethod/deleteSurvey.js";
import { updateASurvey } from "../dbOperations/updateMethods/updateASurvey.js";
import { getRecentSurveys } from "../dbOperations/getMethod/getRecentSurveys.js";
import { getASurveyDetails } from "../dbOperations/getMethod/getASurveyDetails.js";
import { updateASurveyResponse } from "../dbOperations/updateMethods/updateASurveyResponse.js";
import { getASurveyResponseDetails } from "../dbOperations/getMethod/getASurveyResponseDetails.js";
import { getUserRole } from "../dbOperations/getMethod/getUserRole.js";
import { getATotalSurveyResponse } from "../dbOperations/getMethod/getATotalSurveyResponse.js";
import { getAllUsers } from "../dbOperations/getMethod/getAllUsers.js";
import { updateAUserRole } from "../dbOperations/updateMethods/updateAUserRole.js";
import { getAllValidSurveys } from "../dbOperations/getMethod/getAllValidSurveys.js";
import { updateASurveyStatus } from "../dbOperations/updateMethods/updateASurveyStatus.js";

import { getUsersParticipatedResponses } from "../dbOperations/getMethod/getUsersParticipatedResponses.js";
import { getUsersReportedSurveys } from "../dbOperations/getMethod/getUsersReportedSurveys.js";
import { getUsersCommentedSurveys } from "../dbOperations/getMethod/getUsersCommentedSurveys.js";
import { getFeaturedSurveys } from "../dbOperations/getMethod/getFeaturedSurveys.js";
import { getFAQData } from "../dbOperations/getMethod/getFAQData.js";
import { getHowItWorksData } from "../dbOperations/getMethod/getHowItWorksData.js";
import { getAllSurveysForAdmin } from "../dbOperations/getMethod/getAllSurveysForAdmin.js";
import { updateAUserRequestByUser } from "../dbOperations/updateMethods/updateAUserRequestByUser.js";
import { createAPaymentIntent } from "../dbOperations/postMethods/createAPaymentIntent.js";
import { getAdminFeedbacks } from "../dbOperations/getMethod/getAdminFeedbacks.js";
import { createPymentDetails } from "../dbOperations/postMethods/createPymentDetails.js";

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

// Get 6 most participated published surveys
router.get("/featured-surveys", getFeaturedSurveys);

// Get FAQ  public data
router.get("/faq-data", getFAQData);

// Get how it works public data
router.get("/how-it-works", getHowItWorksData);

// Get a  survey response based on the surveyId
router.get("/survey-response/:uid", getATotalSurveyResponse);

// Get a  survey response based on the userId
router.get("/participated-surveys/:uid", getUsersParticipatedResponses);

// Get a  surveys I reported
router.get("/reported-surveys/:uid", getUsersReportedSurveys);

// Get a  surveys on those I Commented
router.get("/commented-surveys/:uid", getUsersCommentedSurveys);

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

// Get all Surveys for admin
router.get("/all-surveys/:uid", getAllSurveysForAdmin);

// Get all valid(Published) surveys for Survey page
router.get("/surveys", getAllValidSurveys);

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

// Create a Payment Intent
router.post("/create-payment-intent", createAPaymentIntent);

// Create a Payment details on successful payment
router.post("/create-payment-details", createPymentDetails);

// --------------------  Delete Operations-------------------------//
// Delete a specific survey data by id requested by surveyor
router.delete("/survey/:id", deleteASurvey);

// --------------------  Update(patch) Operations-------------------//
// Update a specific survey data by id requested by surveyor
router.patch("/survey/:id", updateASurvey);

// Update a specific userRequest to be Surveyor on userModel
router.patch("/user-request/:uid", updateAUserRequestByUser);

// Update a specific user role on userModel
router.patch("/update-user-role/:id", updateAUserRole);

// Update a specific survey Status on both SurveyModel and AdminFeedbackModel
router.patch("/update-survey-status/:id", updateASurveyStatus);

// Update a specific survey response data on both SurveyModel and SurveyResponseModel
router.patch("/survey-response/:id", updateASurveyResponse);

export default router;
