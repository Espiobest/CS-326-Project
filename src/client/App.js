// App.js
import { jobSpoof } from './job.js';
import { NavBar } from './NavBar.js';
import { Profile } from './Profile.js';
import * as db from "./db.js";
import { Events } from './Events.js';
import { jobList } from './jobList.js';
import { CurrentJob } from './currentJob.js';
import { applications } from './applications.js';
import { LoginScreen } from './LoginScreen.js';
import { SignupScreen } from './SignupScreen.js';

export class App {
  #profileViewElm = null;
  #mainViewElm = null;
  #curJobElm = null;
  #jobListElm = null;
  #applicationsViewElm = null;
  #jobBoardViewElm = null;
  #events = null;
  #loginScreen = null;
  #signupScreen = null;

  constructor() {
    this.db = db;
    this.db.initDB();
    this.#events = Events.events();
    this.jobs = null;
    this.loggedInUser = null;
  }

  async render(root) {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser && storedUser != "undefined") {
      this.loggedInUser = JSON.parse(storedUser);
    }

    // this.user = await db.getUser();
    // this.jobs = await db.loadJobs();
    // if (this.jobs.length === 0) {
    //   this.jobs = jobSpoof();
    //   await this.db.modifyJob(this.jobs);
    // }
    this.rootElm = document.getElementById(root);
    this.rootElm.innerHTML = '';

    this.#loginScreen = new LoginScreen(this.#events, this.db);
    this.#signupScreen = new SignupScreen(this.#events, this.db);

    const navbarElm = document.createElement('div');
    navbarElm.id = 'navbar';
    const navbar = new NavBar('jobBoard');
    navbarElm.appendChild(await navbar.render());

    // navbarElm.appendChild(logoutButton);

    this.#mainViewElm = document.createElement('div');
    this.#mainViewElm.id = 'main-view';

    this.#profileViewElm = document.createElement('div');
    this.#profileViewElm.classList.add('flex', 'flex-col', 'align-center', 'bg-white', 'overflow-y-auto', 'rounded', 'w-full');

    this.rootElm.appendChild(navbarElm);
    this.rootElm.appendChild(this.#mainViewElm);

    this.#events.subscribe('navigateTo', (view) => {
      this.#navigateTo(view);
      navbar.view = view;
    });
    this.#events.subscribe('job clicked', async (job) => {
      if (window.location.hash === '#jobBoard') {
        if (this.#curJobElm){
          let oldJobElm = document.getElementById(this.#curJobElm.id);
          if (oldJobElm) {
            oldJobElm.style.backgroundColor = '#E2E8F0';
            document.getElementById(`job-${job._id}`).style.backgroundColor = 'lightgray';
          }
        }
      }
  
      if (!this.#jobBoardViewElm){
        this.#jobBoardViewElm = document.createElement("div");
        this.#jobBoardViewElm.classList.add('flex');
        this.#mainViewElm.appendChild(this.#jobBoardViewElm);
      }
      this.#jobBoardViewElm.removeChild(this.#curJobElm);
      this.#curJobElm = await new CurrentJob(job).render();
      this.#curJobElm.id = `job-${job._id}`;
      this.#jobBoardViewElm.appendChild(this.#curJobElm);
    });
    this.#events.subscribe('applied to job', async (job) => {
      console.log(job, this.jobs);
      if (this.jobs.length === 0) {
        this.jobs = jobSpoof();
        await this.db.modifyJob(this.jobs);
      }
      this.loggedInUser._jobsApplied.push(job);
      console.log(this.loggedInUser);

      this.jobs = this.jobs.filter((jobListing) => {
        return !(JSON.stringify(job) === JSON.stringify(jobListing));
      });

      if (this.jobs.length === 0) {
        this.#jobBoardViewElm.removeChild(this.#curJobElm);
        this.#jobBoardViewElm.removeChild(this.#jobListElm);
        this.#curJobElm = await new CurrentJob(null).render();
        this.#jobBoardViewElm = document.createElement("div");
        this.#jobBoardViewElm.classList.add('flex');
        this.#jobBoardViewElm.appendChild(this.#curJobElm);
        this.#mainViewElm.appendChild(this.#jobBoardViewElm);
        return;
      }

      await this.db.modifyJob(this.jobs);
     
      await this.db.modifyUser(this.loggedInUser, this.loggedInUser.accountType);
      this.#jobBoardViewElm.removeChild(this.#curJobElm);
      this.#jobBoardViewElm.removeChild(this.#jobListElm);
      this.#applicationsViewElm = await new jobList(this.loggedInUser._jobsApplied, 'application').render();

      this.#curJobElm = await new CurrentJob(this.jobs[0]).render();
      this.#jobListElm = await new jobList(this.jobs).render();

      this.#jobBoardViewElm.appendChild(this.#jobListElm);
      this.#jobBoardViewElm.appendChild(this.#curJobElm);
    });

    this.#events.subscribe('reset', async () => {
      await this.db.clearDB();
      this.jobs = jobSpoof();
      this.#navigateTo('jobBoard');
      window.location.reload(true);
    });

    this.#events.subscribe('logout', async () => {
      localStorage.removeItem('loggedInUser');
      console.log("Logout clicked");
      await this.db.clearDB();
      fetch('http://localhost:4000/logoutUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.loggedInUser,
          accountType: this.loggedInUser.accountType,
        })
      })
      this.loggedInUser = null;

      this.#navigateTo('login');
    });


    this.#events.subscribe('loggedIn', async (user, accountType) => {
      this.loggedInUser = user;
      await this.db.modifyUser(user, accountType);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      await this.renderUI();
      if (accountType === 'applicant') {
        this.#navigateTo('jobBoard');
      }
      else {
        this.#navigateTo('applications');
      }
      
    });

    // const initialView = window.location.hash.replace('#', '');
    // if (initialView === 'login' || initialView === 'signup') {
    //   this.#navigateTo(initialView);
    // } else {
    if (this.loggedInUser) {
      console.log("logged in user", this.loggedInUser);
      if (this.loggedInUser.accountType === 'applicant') {
        this.#navigateTo('jobBoard');
      }
      else {
        this.#navigateTo('applications');
      }
    } else {
      this.#navigateTo('login');
    }
    
  }

  async #navigateTo(view) {
    this.jobs = await this.db.loadJobs();
    if (!this.loggedInUser){
      let user = localStorage.getItem('loggedInUser')
      if (user && user != "undefined") {
        this.loggedInUser = JSON.parse(user);
      }
      else{
        this.loggedInUser = this.db.getUser();
      }
    }

    this.#mainViewElm.innerHTML = '';
    if (view === 'jobBoard') {
      if (!this.loggedInUser) {
        this.#navigateTo('login');
        return;
      }
      let searchElm = document.getElementById('search-bar');
      if (searchElm) {
        searchElm.style.display = 'flex';
      }
      
      this.jobs = await this.db.loadJobs();
      if (this.jobs.length === 0) {
        this.jobs = jobSpoof();
      }
      this.#jobListElm = await new jobList(this.jobs).render();
      this.#curJobElm = await new CurrentJob(this.jobs[0]).render();
      this.#curJobElm.id = `job-${this.jobs[0]._id}`;
      this.#jobBoardViewElm = document.createElement("div");
      this.#jobBoardViewElm.classList.add('flex');

      this.#jobBoardViewElm.appendChild(this.#jobListElm);
      this.#jobBoardViewElm.appendChild(this.#curJobElm);

      this.#mainViewElm.appendChild(this.#jobBoardViewElm);
    } else if (view === 'applications') {
      
        if (!this.loggedInUser) {
          this.#navigateTo('login');
          return;
        }
        console.log("app", this.loggedInUser)
        this.#applicationsViewElm = await new jobList(this.loggedInUser._jobsApplied, 'application').render();

        if (this.#applicationsViewElm && this.#applicationsViewElm.firstChild && this.#applicationsViewElm.firstChild.id !== "reset"){
          const resetButton = document.createElement('button');
          resetButton.id = "reset"
          resetButton.textContent = 'Reset';
          resetButton.addEventListener('click', async () => {
            this.loggedInUser._jobsApplied = [];

            this.jobs = jobSpoof();
            this.#navigateTo('jobBoard');
            window.location.reload(true);
          });
          this.#applicationsViewElm.insertBefore(resetButton, this.#applicationsViewElm.firstChild);
        }
        this.#mainViewElm.appendChild(this.#applicationsViewElm);
        let searchElm = document.getElementById('search-bar');
        if (searchElm){
          searchElm.style.display = 'none';
        }
        
    } else if (view === 'profile') {
        if (!this.loggedInUser) {
          this.#navigateTo('login');
          return;
        }
        this.#profileViewElm.innerHTML = new Profile().render(this.loggedInUser);
        this.#mainViewElm.appendChild(this.#profileViewElm);
      
        let searchElm = document.getElementById('search-bar');
        if (searchElm){
          searchElm.style.display = 'none';
        }
        
        if (this.loggedInUser._resume){
          // add remove button
          let removeButton = document.createElement('button');
          removeButton.textContent = 'Remove Resume';
          this.#profileViewElm.appendChild(removeButton);
          removeButton.addEventListener('click', async e => {
            this.loggedInUser._resume = null;
            await this.db.modifyUser(this.loggedInUser);
            document.getElementById('resumeDiv').innerHTML = '';
          });
          PDFObject.embed(URL.createObjectURL(this.loggedInUser._resume), "#resumeDiv");
        }
  
        document.getElementById('ps').value = this.loggedInUser._personalStatement || "Enter a personal statement here";
        document.getElementById('submit').addEventListener('click', async e => {
          this.loggedInUser._personalStatement = document.getElementById('ps').value;
          let resume = document.getElementById('resume').files;
          if (resume.length > 0){
            this.loggedInUser._resume = resume[0];
          }
          await this.db.modifyUser(this.loggedInUser);
          alert('User details saved');
        });

    } else if (view === 'login') {
      let searchElm = document.getElementById('search-bar');
      if (searchElm) {
        searchElm.style.display = 'none';
      }
      this.#mainViewElm.innerHTML = '';
      console.log("rendering login", this.#mainViewElm);
      this.#mainViewElm.appendChild(await this.#loginScreen.render());
    } else if (view === 'signup') {
      let searchElm = document.getElementById('search-bar');
      if (searchElm) {
        searchElm.style.display = 'none';
      }
      this.#mainViewElm.innerHTML = '';
      this.#mainViewElm.appendChild(await this.#signupScreen.render());
    }
    window.location.hash = view;
  }

  async renderUI(){
    const searchElm = document.createElement('div');
    searchElm.style.display = 'flex';
    searchElm.id = 'search-bar';

    const searchInputElm = document.createElement('input');
    searchInputElm.type = 'text';
    searchInputElm.id = 'search-navbar';
    searchInputElm.classList.add('block', 'w-full', 'p-2', 'ps-10', 'text-sm', 'text-gray-900', 'border', 'border-gray-150', 'rounded-lg', 'bg-gray-50', 'focus:ring-charcoal', 'focus:border-charcoal');
    searchInputElm.placeholder = 'Type to filter...';
    searchElm.appendChild(searchInputElm);

    const searchButton = document.createElement('button');
    searchButton.id = 'search';
    searchButton.classList.add('rounded', 'bg-rose-900', 'border-2', 'hover:bg-rosewood', 'hover:border-red-950', 'hover:border-2', 'text-white', 'py-2', 'px-3', 'font-mono');
    searchButton.innerText = 'Search';
    searchElm.appendChild(searchButton);

    const preferencesButton = document.createElement('img');
    preferencesButton.src = './assets/sliders-solid.svg';
    preferencesButton.style.height = preferencesButton.style.width = '44px';

    const preferences = document.createElement('div');
    preferences.innerHTML = `
      <div class="mb-5 rounded-lg bg-slate-200 p-5">
        Pay: $<input type="text" id="pay"> or greater Skills: <input type="text" id="skill-input"> <ul id="skill-list"></ul>
        Work study?
        <select name="" id="work-study">
          <option value="Any">Any</option>
          <option value=true>Yes</option>
          <option value=false>No</option>
        </select>
        Hiring Period
        <select name="" id="hiring-period">
          <option value="Any">Any</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
      </div>
    `;
    preferences.style.display = 'none';
    const idMap = {};
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && document.getElementById('skill-input').value !== '') {
        const skillInput = document.getElementById('skill-input');
        const skill = skillInput.value;
        skillInput.value = '';
        let li = document.createElement('li');
        li.innerText = skill;
        let img = document.createElement('img');
        img.src = './assets/x-solid.svg';
        img.width = img.height = 10;
        img.classList.add('cross');
        img.addEventListener('click', (e) => {
          e.target.parentElement.remove();
        });
        li.appendChild(img);
        document.getElementById('skill-list').appendChild(li);
        idMap[li] = skill;
      }
    });
    preferencesButton.addEventListener('click', async (e) => {
      if (preferences.style.display === 'none') {
        preferences.style.display = 'block';
      } else {
        preferences.style.display = 'none';
      }
    });

    searchElm.appendChild(preferencesButton);
    this.rootElm.appendChild(searchElm);
    this.rootElm.appendChild(preferences);

    searchInputElm.addEventListener('input', async (e) => {
      const filter = e.target.value;
      this.#jobListElm = await new jobList(this.jobs.filter(job => job._title.toLowerCase().includes(filter) || job._brief.toLowerCase().includes(filter))).render();
      this.#jobBoardViewElm.innerHTML = '';
      this.#jobBoardViewElm.appendChild(this.#jobListElm);
      this.#jobBoardViewElm.appendChild(this.#curJobElm);
      this.#mainViewElm.appendChild(this.#jobBoardViewElm);
    });

    searchButton.addEventListener('click', async () => {
      const payInput = document.getElementById('pay');
      const skillInput = document.getElementById('skill-list');
      const workStudyCheckbox = document.getElementById('work-study');
      const hiringPeriodSelect = document.getElementById('hiring-period');
      const pay = payInput.value;
      if (isNaN(pay)) {
        alert('Pay must be a number');
        return;
      }
      const skills = [];
      for (let i = 0; i < skillInput.children.length; i++) {
        const li = skillInput.children[i];
        const skill = li.innerText;
        skills.push(skill.toLowerCase());
      }
      const workStudy = workStudyCheckbox.value;
      const hiringPeriod = hiringPeriodSelect.value;
      const filteredJobs = this.jobs.filter(job => {
        if (pay && job.pay <= parseFloat(pay)) {
          return false;
        }
        if (skills.length > 0 && !skills.some(skill => job._skills.map(j => j.toLowerCase()).includes(skill))) {
          return false;
        }
        if (workStudy !== "Any" && workStudy != job._workStudy.toString()) {
          return false;
        }
        if (hiringPeriod !== 'Any' && !job._hiringPeriod.includes(hiringPeriod)) {
          return false;
        }
        return true;
      });
      if (filteredJobs.length === 0) {
        alert('No results found');
        return;
      }

      this.#jobListElm = await new jobList(filteredJobs).render();
      this.#jobBoardViewElm.innerHTML = '';
      this.#jobBoardViewElm.appendChild(this.#jobListElm);
      this.#jobBoardViewElm.appendChild(this.#curJobElm);
    });

    this.#applicationsViewElm = await new jobList(this.loggedInUser._jobsApplied, 'application').render();
    this.#applicationsViewElm.classList.add('overflow-y-auto');
    
    this.#navigateTo('jobBoard');

  }
}