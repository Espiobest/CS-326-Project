# CS-326-Project
## How to run
run npm milestone-02 in root folder

## Interface tour
Upon running the command above (you may have to reload the page) you are greeted by the Job list view on the left and expanded listing that we're focusing on on the right. You can click different job postings in the list to focus on different ones, and press the blue "Apply" button to apply. For now applying just sends the job listing into a list in the applications view (which you can go to by pressing the "Applications" link in the navbar up top). You can go to the profile (click the person in the circle) and view the personal information of the current user, and edit the personal statement. 

## File tour
* `App.js`: Where the code code for each view comes together and is stored
* `jobList.js` & `jobListItem.js`: Class to render job list in the application section, and the jobs section
* `application.js`: Class for applications view, just a lit of applied jobs...for now
* `currentJob.js`:
* `Events.js`: The singleton class to that allows for publishing and subscribing to events
* `db.js`: The class tha contains methods for storing data using PouchDB
* `index.html`: The place where all the code is injects
* `index.js`: Renders the whole App()
* `NavBar.js`: Class that stores the navbar 
* `profile.js`: Profile view
* `user.js` user class
