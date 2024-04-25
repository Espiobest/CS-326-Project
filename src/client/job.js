export class Job {
    constructor(id, title, brief, pay, skills, hours, location, description, workStudy, hiringPeriod) {
      this._id = id;
      this._title = title;
      this._brief = brief;
      this._pay = pay;
      this._skills = skills;
      this._hours = hours;
      this._location = location;
      this._description = description;
      this._workStudy = workStudy;
      this._hiringPeriod = hiringPeriod;
    }
  
    // Getter and setter for id
    get id() {
      return this._id;
    }
    set id(value) {
      this._id = value;
    }
  
    // Getter and setter for title
    get title() {
      return this._title;
    }
    set title(value) {
      this._title = value;
    }
  
    // Getter and setter for brief
    get brief() {
      return this._brief;
    }
    set brief(value) {
      this._brief = value;
    }
  
    // Getter and setter for pay
    get pay() {
      return this._pay;
    }
    set pay(value) {
      this._pay = value;
    }
  
    // Getter and setter for skills
    get skills() {
      return this._skills;
    }
    set skills(value) {
      this._skills = value;
    }
  
    // Getter and setter for hours
    get hours() {
      return this._hours;
    }
    set hours(value) {
      this._hours = value;
    }
  
    // Getter and setter for location
    get location() {
      return this._location;
    }
    set location(value) {
      this._location = value;
    }
  
    // Getter and setter for description
    get description() {
      return this._description;
    }
    set description(value) {
      this._description = value;
    }

    // Getter and setter for workStudy
    get workStudy() {
      return this._workStudy;
    }
    set workStudy(value) {
      this._workStudy = value;
    }

    // Getter and setter for hiringPeriod
    get hiringPeriod() {
      return this._hiringPeriod;
    }
    set hiringPeriod(value) {
      this._hiringPeriod = value;
    }
}

let count = 0;

const genID = () => {
  return ++count;
}

const getDescription = () => {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

// job spoof function
export function jobSpoof() {
  const jobs = [
    new Job(
      genID(),
      "Software Engineer Intern",
      "Work on the front-end and back-end of a web application",
      30,
      ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
      32,
      "Manning College",
      getDescription(),
      true,
      ["Spring", "Fall", "Summer"]
    ),
    new Job(
      genID(),
      "Marketing Associate",
      "Assist in the development and implementation of marketing strategies",
      20,
      ["Marketing", "Social Media", "SEO", "Google Analytics"],
      20,
      "Isenberg",
      getDescription(),
      false,
      ["Summer"]
    ),
    new Job(
      genID(),
      "Research Assistant",
      "Assist in the development of research projects",
      15,
      ["Research", "Data Analysis", "Excel", "Python"],
      15,
      "Physical Sciences Building",
      getDescription(),
      true,
      ["Fall"]
    ),
    new Job(
      genID(),
      "Graphic Design Intern",
      "Create visual content for social media and marketing campaigns",
      25,
      ["Adobe Creative Suite", "Illustrator", "Photoshop", "InDesign"],
      25,
      "Fine Arts Center",
      getDescription(),
      false,
      ["Spring"]
    ),
    new Job(
      genID(),
      "Office Assistant",
      "Assist in the daily operations of the office",
      18,
      ["Microsoft Office", "Customer Service", "Organization"],
      20,
      "Whitmore",
      getDescription(),
      true,
      ["Fall", "Spring"]
    ),
    new Job(
      genID(),
      "Data Analyst Intern",
      "Analyze data and create reports for various projects",
      30,
      ["SQL", "Python", "Data Analysis", "Excel"],
      30,
      "Isenberg School of Management",
      getDescription(),
      true,
      ["Spring"]
    )
  ];

  
  return jobs;
}




