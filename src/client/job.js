export class Job {
    constructor(id, title, brief, pay, skills, hours, location, description, workStudy) {
      this._id = id;
      this._title = title;
      this._brief = brief;
      this._pay = pay;
      this._skills = skills;
      this._hours = hours;
      this._location = location;
      this._description = description;
      this._workStudy = workStudy;
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
    {
      id: genID(),
      postingDate: new Date(2024, 4, 15),
      title: "Software Engineer Intern",
      skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
      brief: "Work on the front-end and back-end of a web application",
      location: "Manning College", 
      workStudy: true,
      hiringPeriod: ["Spring", "Fall", "Summer"],
      description: getDescription(),
      pay: 30,
      hours: 32
    },
    {
      id: genID(),
      postingDate: new Date(2024, 3, 27),
      title: "Marketing Associate",
      skills: ["Marketing", "Social Media", "SEO", "Google Analytics"],
      brief: "Assist in the development and implementation of marketing strategies",
      location: "Isenberg",
      workStudy: false,
      hiringPeriod: ["Summer"],
      description: getDescription(),
      pay: 20,
      hours: 20
    },
    {
      id: genID(),
      postingDate: new Date(2024, 5, 2),
      title: "Research Assistant",
      skills: ["Research", "Data Analysis", "Excel", "Python"],
      brief: "Assist in the development of research projects",
      location: "Physical Sciences Building",
      workStudy: true,
      hiringPeriod: ["Fall"],
      description: getDescription(),
      pay: 15,
      hours: 15
    },
    {
      id: genID(),
      postingDate: new Date(2024, 4, 9),
      title: "Graphic Design Intern",
      skills: ["Adobe Creative Suite", "Illustrator", "Photoshop", "InDesign"],
      brief: "Create visual content for social media and marketing campaigns",
      location: "Fine Arts Center",
      workStudy: false,
      hiringPeriod: ["Spring"],
      description: getDescription(),
      pay: 25,
      hours: 25,
    },
    {
      id: genID(),
      postingDate: new Date(2024, 4, 22),
      title: "Office Assistant", 
      skills: ["Microsoft Office", "Customer Service", "Organization"],
      brief: "Assist in the daily operations of the office",
      location: "Whitmore",
      workStudy: true,
      hiringPeriod: ["Fall", "Spring"],
      description: getDescription(),
      pay: 18,
      hours: 20
    },
    {
      id: genID(),
      postingDate: new Date(2024, 4, 31),
      title: "Data Analyst Intern",
      skills: ["SQL", "Python", "Data Analysis", "Excel"],
      brief: "Analyze data and create reports for various projects",
      location: "Isenberg School of Management",
      workStudy: true,
      hiringPeriod: ["Spring"],
      description: getDescription(),
      pay: 30,
      hours: 30
    }
  ];
  
  return jobs;
}




