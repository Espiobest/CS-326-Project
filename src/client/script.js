import { Store } from "./store.js";
import { Job } from "./job.js";

const listings = document.getElementById('listings');
const searchButton = document.getElementById('search');
const searchNavbar = document.getElementById('search-navbar');

const postings = [
    {
      postingDate: "04/15/2024",
      title: "Software Engineer Intern",
      location: "San Francisco, CA", 
      workStudy: "yes",
      hiringPeriod: "academic year",
      hours: "32 hours/week"
    },
    {
      postingDate: "03/27/2024",
      title: "Marketing Associate",
      location: "New York, NY",
      workStudy: "no",
      hiringPeriod: "summer only",
      hours: "20 hours/week"
    },
    {
      postingDate: "05/02/2024", 
      title: "Research Assistant",
      location: "Boston, MA",
      workStudy: "either or not",
      hiringPeriod: "fall only",
      hours: "15 hours/week"
    },
    {
      postingDate: "04/09/2024",
      title: "Graphic Design Intern",
      location: "Seattle, WA",
      workStudy: "either or not",
      hiringPeriod: "spring only", 
      hours: "25 hours/week"
    },
    {
      postingDate: "04/22/2024",
      title: "Office Assistant", 
      location: "either or not",
      workStudy: "Hiring",
      hiringPeriod: "academic year only",
      hours: "15 hours/week"
    },
    {
      postingDate: "03/31/2024",
      title: "Data Analyst Intern",
      location: "Chicago, IL",
      workStudy: "yes",
      hiringPeriod: "spring only",
      hours: "30 hours/week"
    }
];