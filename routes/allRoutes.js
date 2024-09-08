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
import { getAllPayments } from "../dbOperations/getMethod/getAllPayments.js";
import { verifyToken } from "../dbOperations/authentication/verifyToken.js";
import { verifyAdmin } from "../dbOperations/authentication/verifyAdmin.js";
import { verifySurveyor } from "../dbOperations/authentication/verifySurveyor.js";
import { verifyProUser } from "../dbOperations/authentication/verifyProUser.js";
import { verifySurveyorOrProUser } from "../dbOperations/authentication/verifySurveyorOrProUser.js";
import { getUsersResponedSurveys } from "../dbOperations/getMethod/getUsersResponedSurveys.js";
import { verifySurveyorOrAdmin } from "../dbOperations/authentication/verifySurveyorOrAdmin.js";
import { getUserStatistics } from "../dbOperations/getMethod/getUserStatistics.js";

// import { updateExistingDoc } from "../dbOperations/helper/updateExistingDoc.js";

// Initiate router
const router = express.Router();

// --------------------  Get operations-----------------------------//
//API test
router.get("/test", test);

// Get all the surveys that created by a specific surveyor [surveor data]
router.get(
  "/surveyor-surveys/:sid",
  verifyToken,
  verifySurveyor,
  getSurveyorsSurveys
);

// Get 6 recently published surveys [Home page data]
router.get("/recent-surveys", getRecentSurveys);

// Get 6 most participated published surveys [Home page data]
router.get("/featured-surveys", getFeaturedSurveys);

// Get FAQ  public data [Home page data]
router.get("/faq-data", getFAQData);

// Get how it works public data [Home page data]
router.get("/how-it-works", getHowItWorksData);

// Get a  survey response based on the surveyId [Surveyor || Admin access]
router.get(
  "/survey-response/:uid",
  verifyToken,
  verifySurveyorOrAdmin,
  getATotalSurveyResponse
);

// Get a  survey response based on the userId [logged in user data]
router.get(
  "/participated-surveys/:uid",
  verifyToken,
  getUsersParticipatedResponses
);

// Get a  surveys I reported [logged in normal user data]
router.get("/reported-surveys/:uid", verifyToken, getUsersReportedSurveys);

// Get those  surveys have response [Admin only access]
router.get(
  "/responded-surveys/:uid",
  verifyToken,
  verifyAdmin,
  getUsersResponedSurveys
);

// Get  surveys on those I Commented [Pro user data]
router.get(
  "/commented-surveys/:uid",
  verifyToken,
  verifyProUser,
  getUsersCommentedSurveys
);

// Get a survey details from surveyModel based on the id [public data for survey details page]
router.get("/single-survey", getASurveyDetails);

// Get a  survey details from surveyResponseModel based on the id [public data for survey details page]
router.get(
  "/user-survey-response/:uid",
  verifyToken,
  getASurveyResponseDetails
);

// Get a  user role
// router.get("/user-role/:id", getUserRole);

// Get admin feedbacks of a particular survey [surveyor data]
router.get(
  "/admin-feedbacks/:uid",
  verifyToken,
  verifySurveyor,
  getAdminFeedbacks
);

// Get all users [Admin only data]
router.get("/all-users/:uid", verifyToken, verifyAdmin, getAllUsers);

// Get all successful payments ddata [Admin only data]
router.get("/all-payments/:uid", verifyToken, verifyAdmin, getAllPayments);

// Get all Surveys for admin [Admin only data]
router.get(
  "/all-surveys/:uid",
  verifyToken,
  verifyAdmin,
  getAllSurveysForAdmin
);

// Get users dashoard statistics
// router.get("/user-statistics", verifyToken, getUserStatistics);
router.get("/user-statistics/:id", getUserStatistics);

// Get all valid(Published) surveys for Survey page [public survey-page data]
router.get("/surveys", getAllValidSurveys);

// ------Danger---- Update field in existing database ---------------//
// router.get("/update", updateExistingDoc);

// --------------------  Post Operations ----------------------------//
//Check if the Email is already in the DB or not [register page data]
router.post("/check-email", checkEamilExist);

// if Exist do nothing, or Create user with user info [login-register page request]
router.post("/create-user", createUser);

// Create token and send with user request
router.post("/jwt", createToken);

// Create a survey   [Surveyor only data]
router.post("/create-survey", verifyToken, verifySurveyor, createSurvey);

// Create a Payment Intent [Logged in user operation]
router.post("/create-payment-intent", verifyToken, createAPaymentIntent);

// Create a Payment details on successful payment [Logged in user operation]
router.post("/create-payment-details", verifyToken, createPymentDetails);

// --------------------  Delete Operations-------------------------//
// Delete a specific survey data by id requested by surveyor [Surveyor only access]
router.delete("/survey/:id", verifyToken, verifySurveyor, deleteASurvey);

// --------------------  Update(patch) Operations-------------------//
// Update a specific survey data by id requested by surveyor [surveyor only data]
router.patch("/survey/:id", verifyToken, verifySurveyor, updateASurvey);

// Update a specific userRequest to be Surveyor on userModel [logged in user access]
router.patch("/user-request/:uid", verifyToken, updateAUserRequestByUser);

// Update a specific user role on userModel [admin only data]
router.patch(
  "/update-user-role/:id",
  verifyToken,
  verifyAdmin,
  updateAUserRole
);

// Update a specific survey Status on both SurveyModel and AdminFeedbackModel  [admin only data]
router.patch(
  "/update-survey-status/:id",
  verifyToken,
  verifyAdmin,
  updateASurveyStatus
);

// Update a specific survey response data on both SurveyModel and SurveyResponseModel  [user data to update data like: Make Report]
router.patch("/survey-response/:id", verifyToken, updateASurveyResponse);

export default router;
