# CS-326-Project

## How to run

-  **`npm run server`**: runs **`npm run milestone-02`** and

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

*  `App.js`: Where the code code for each view comes together and is stored

*  `jobList.js` & `jobListItem.js`: Class to render job list in the application section, and the jobs section

*  `application.js`: Class for applications view, just a lit of applied jobs...for now

*  `currentJob.js`:

*  `Events.js`: The singleton class to that allows for publishing and subscribing to events

*  `db.js`: The class tha contains methods for storing data using PouchDB

*  `index.html`: The place where all the code is injects

*  `index.js`: Renders the whole App()

*  `NavBar.js`: Class that stores the navbar

*  `profile.js`: Profile view

*  `user.js` user class
