# CS-326-Project

## How to run

-  **`npm run start`**: runs the server and the frontend for milestone 3

-  **`npm run milestone-01`**: renders documentation including information about team, and initial goals for project

-  **`npm run milestone-02`**: renders the frontend (login/signup screen)

  

## Interface tour
Click on signup and enter the desired details, and click signup. Depending on whether you signed in as an employer or a user, this takes you to the relevant view.
### Employer View
- Profile Image: a profile page with employer details (including an editable description)
- Create/Edit New Job: a form that allows creating a new job listing or edit an existing listing
- Dashboard: a dashboard for job listings.
--  'delete' deletes the relevant job from PouchDB
-- 'expand' displays the selected listing in a side-by-side view
--  'edit' goes back to the form which allows modification of the form

### User View
You are greeted by the Job list view on the left and expanded listing that we're focusing on on the right. You can click different job postings in the list to focus on different ones, and press the blue "Apply" button to apply. For now applying just sends the job listing into a list in the applications view (which you can go to by pressing the "Applications" link in the navbar up top). You can go to the profile (click the person in the circle) and view the personal information of the current user, and edit the personal statement.

  

## File tour
A list of main files and their uses is given below.
- Client: 
*  `App.js`: Where the code code for each view comes together and is stored

*  `EmployeeApp.js`: Where the code for the employer view comes in, just to separate the views

*  `jobList.js` & `jobListItem.js`: Class to render job list in the application section, and the jobs section

*  `currentJob.js`: Class to render the current job on the right side of the job view page

*  `Events.js`: The singleton class to that allows for publishing and subscribing to events

*  `db.js`: The class that contains methods for storing persistent data on client-side using PouchDB

*  `index.html`: The place where all the code is injects

*  `index.js`: Renders the whole App()

*  `NavBar.js`: Class that stores the navbar

*  `profile.js`: Profile view

*  `user.js` user class

- Server:
*  `server.js`: CRUD API to handle the backend requests and set up the Express.js server
*  `db.js`: Handle the backend database. Houses the databases to store the list of users, employers and jobs in the backend.