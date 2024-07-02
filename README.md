<h1>SurveySync</h1>

<h2>Proceed To Run On Your Local</h2>

- **_Have A Local Version_**: Clone or download the latest commited version of this frontend for your local machine

- **_Initiate Projects_**: use "npm install" to install all the necessary dependencies

- **_Set Up The Environment Variables_**: Don't forget to set up the environment variables with your own credentials needed to run this projects. Most variable are defined in index.js file.

- **_Find The Frontend_**: Clone or download the frontend from here: https://github.com/snokeOver/surveysync-frontend

<h2>Live Site URL</h2>
<p>Cick here to go to the live website: <a href="https://survey-sync0.web.app/">https://survey-sync0.web.app/</a></p>

<h2>Features and Characteristics</h2>

- **_Search Functionality_**: Enables users to search and paginate through surveys efficiently, enhancing accessibility to relevant content.

- **_Survey Management_**: Surveyors can create, update, and manage surveys, including adding questions, setting deadlines, and categorizing surveys, ensuring a seamless survey creation process.

- **_Secure Authentication_**: Implements JWT authentication for secure user login and access to private routes, ensuring data security for surveyor, admin, pro-user and user privacy.

- **_Secure Data Handling_**: Utilizes environment variables to safeguard sensitive information such as database credentials, enhancing data protection and preventing unauthorized access.

- **_User Role Management_**: Supports user roles including user, surveyor, admin, and pro-user, with distinct privileges and access levels, ensuring proper governance and control over the system.

- **_Payment Integration_**: Integrates a payment system(Stripe) for pro-user memberships to become pro-user, allowing users to access premium features and enhancing user experience.

- **_Feedback Mechanism_**: Provides a feedback system for admin actions, allowing users to provide feedback when surveys are unpublished, promoting transparency and user engagement.

- **_Responsive Design_**: Ensures seamless user experience across various devices, including desktops, tablets, and mobile phones, optimizing accessibility and usability.

- **_Data Visualization_**: Visualizes survey results through charts and graphs, enabling users to analyze survey responses easily and make informed decisions.

- **_Customizable Surveys_**: Allows surveyors to customize survey questions, options, categories, and deadlines, enabling flexibility and meeting specific survey requirements efficiently.

<h2>Packages Used</h2>

- **_Express_**: Backend framework for building APIs and handling database interactions, ensuring efficient server-side operations.

- **_dotenv_**: Library for managing environment variables securely, keeping sensitive information protected.

- **_MongoDb_**: NoSQL database used for data storage, providing flexibility and scalability for handling large amounts of data.
- **_Mongoose_**: Object Data Modeling (ODM) library for MongoDB, used to interact with the database with ease and structure.

- **_jsonwebtoken_**: Tool for generating secure authentication tokens for authorization of user

- **_Stripe_**: Payment processing system integrated to handle secure transactions for pro-user memberships and other payment-related functionalities.
