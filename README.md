# EmailFlow Project

EmailFlow is an email automation tool that allows users to create custom email flows, select target audiences, upload CSVs of contacts, choose email templates, and schedule email sending based on predefined sequences. This project involves both frontend and backend components, with a user authentication system and a customizable email flow setup.

## Features:
- **Signup & Login**: User authentication system for secure access.
- **Dashboard**: Create and manage email automation projects.
- **Flow Creation**: Design a customized email flow, including the option to upload a list of contacts via CSV.
- **Template Management**: Choose from sample email templates or create custom templates with subject and content.
- **Wait Options**: Define wait times between emails in the flow.
- **Flow Saving & Execution**: Save and start the flow, triggering emails to the selected contacts.

## Prerequisites:
Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)

## Setup Instructions:

### 1. Clone the Repository:
First, clone the repository to your local machine:
```bash
git clone https://github.com/RIDHIJAIN1/emailflow.git
cd emailflow
2. Install Dependencies:
Install the required dependencies using npm:

bash
Copy code
npm install
3. Environment Setup:
Make sure to set up your environment variables. You will need to create a .env file and configure the necessary API keys, database connections, and any other services (e.g., email service provider).

npm run dev
4.EmailflowFrontend: Navigate to the frontend folder and run:

bash
Copy code
npm start
5. Access the Application:
Once everything is running, go to http://localhost:3000 in your browser to access the login page.

How to Use:
Step 1: Signup
Upon accessing the site, you will be prompted with the signup page.
Fill in the necessary details (name ,email, password) and click "Sign Up" to create an account.

Step 2: Login
Once you’ve signed up, use your credentials to log in.

Step 3: Create a Project
After logging in, you'll be directed to the Dashboard.
Here you can create a new project by clicking on "Create New Project".
Enter the project details (name) and click "Create".

Step 4: Create an Email Flow
Click on the project you just created to enter the Email Flow Creation page.
Create on List Creation - you need to insert csv file with column first_name , last_name , email.
Choose the list of recipients from your contacts. You can:
Select from predefined lists.

Step 5: Choose an Email Template
After selecting the list, choose template you want to send in Cold Email.
You can select from sample templates or create a custom template:
Enter a subject, content, and template name for your custom email template.

Step 6: Define the Wait Time
You can add a "Wait" step between emails. For instance, set a wait time (in minutes/hours/days) before sending the next email in the flow.

Step 7: Save and Start the Flow
Once you’ve defined the entire flow, click "Save" to save the sequence.
You can start the flow by clicking the "Start" button, which will begin sending the emails to your selected contacts based on the flow you've set up.


Technologies Used:
Frontend: React, Tailwind CSS
Backend: Node.js, Express
Database: MongoDB (for storing user data, projects, and email flows)
Authentication: JWT (JSON Web Token)
Email Service: (e.g., Nodemailer, Agenda)
Contributing:
If you'd like to contribute to this project, please fork the repository and submit a pull request with your changes. Be sure to include tests and documentation as needed.

License:
This project is licensed under the MIT License - see the LICENSE file for details.

Contact:
For questions or feedback, feel free to reach out to me via email at [your-email@example.com].

markdown
Copy code

### Explanation:

1. **Project Overview**: Describes the general functionality of the EmailFlow application.
2. **Setup Instructions**: Outlines how to clone the repo, install dependencies, and set up the development environment.
3. **Usage Steps**: Guides users through the signup, login, project creation, email flow configuration, and email sending.
4. **Technologies Used**: Lists the tech stack, including frontend and backend frameworks, authentication method, and email service.
5. **Contributing**: Encourages contributions and guides on how to contribute.
6. **License**: Indicates the licensing information.

This README ensures that a user can easily set up, run, and use your EmailFlow project while understanding its functionality.





