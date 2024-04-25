import { jobSpoof } from './job.js';

import { NavBar } from './NavBar.js';
import { Profile } from './Profile.js';
import * as db from "./db.js";
import { User } from './user.js';

import { Events } from './Events.js';
import { jobList } from './jobList.js';
import { CurrentJob } from './currentJob.js';
import { applications } from './applications.js';

export class App {
  #profileViewElm = null;
  #mainViewElm = null;
  #applicationsViewElm = null;
  #jobBoardViewElm = null;
  #events = null;
  constructor() {
    this.db = db;
    this.db.initDB();
    this.user = null;
    this.#events = Events.events();
    this.jobs = null;
  }

  async render(root) {
    this.user = await db.getUser();
    this.jobs = await db.loadJobs();
    if (this.jobs.length === 0){
      this.jobs = jobSpoof();
    }
    const rootElm = document.getElementById(root);
    rootElm.innerHTML = '';

    const navbarElm = document.createElement('div');
    navbarElm.id = 'navbar';
    const navbar = new NavBar('jobBoard');
    navbarElm.appendChild(await navbar.render());

    
    this.#mainViewElm = document.createElement('div');
    this.#mainViewElm.id = 'main-view';
    this.#mainViewElm.maxHeight = '100vh';

    this.#profileViewElm = document.createElement('div');
    this.#profileViewElm.classList.add('flex', 'flex-col', 'align-center', 'bg-white', 'overflow-y-auto', 'rounded', 'w-full');
    this.#profileViewElm.innerHTML = new Profile().render();

    rootElm.appendChild(navbarElm);
    
    //search bar
    const searchElm = document.createElement('div');
    //make searchElm display elements in a row
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
    preferences.innerHTML = 
    `<div class="mb-5 rounded-lg bg-slate-200 p-5">
    Pay: $<input type="text" id="pay"> or greater Skills: <input type="text" id="skill-input"> <ul id="skill-list"></ul> Work study? <input type="checkbox" name="" id="work-study">Hiring Period <select name="" id="hiring-period">
      <option value="Any">Any</option>
      <option value="Fall">Fall</option>
      <option value="Spring">Spring</option>
      <option value="Summer">Summer</option>  
    </select>
  </div>`;
    preferences.style.display = 'none';
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && document.getElementById('skill-input').value !== '') {
        const skillInput = document.getElementById('skill-input');
        const skill = skillInput.value;
        skillInput.value = '';
        document.getElementById('skill-list').innerHTML += `<li>${skill}<img src="./assets/x-solid.svg" height="10px" width="10px"></li>`

      }
    })
    preferencesButton.addEventListener('click', async e => {
      if ( preferences.style.display === 'none'){preferences.style.display = 'block';}
      else {preferences.style.display = 'none';}
    });

  
    searchElm.appendChild(preferencesButton);
    rootElm.appendChild(searchElm);
    rootElm.appendChild(preferences);
    
    //append main view to root
    rootElm.appendChild(this.#mainViewElm);

    let jobListElm = await new jobList(this.jobs).render();
    let curJobElm = await new CurrentJob(this.jobs[0]).render();
    curJobElm.id = `job-${this.jobs[0]._id}`;
    this.#jobBoardViewElm = document.createElement("div");
    this.#jobBoardViewElm.classList.add('flex');
    
    this.#jobBoardViewElm.appendChild(jobListElm);
    this.#jobBoardViewElm.appendChild(curJobElm);
    
    searchInputElm.addEventListener('input', async e => {
      const filter = e.target.value;
      jobListElm = await new jobList(this.jobs.filter(job => job.title.toLowerCase().includes(filter) || job.brief.toLowerCase().includes(filter))).render();
      this.#jobBoardViewElm.innerHTML = '';
      this.#jobBoardViewElm.appendChild(jobListElm);
      this.#jobBoardViewElm.appendChild(curJobElm);
      this.#mainViewElm.appendChild(this.#jobBoardViewElm);
      
    });
    
    searchButton.addEventListener('click', async () => {
    const payInput = document.getElementById('pay');
    const skillInput = document.getElementById('skill-list');
    const workStudyCheckbox = document.getElementById('work-study');
    const hiringPeriodSelect = document.getElementById('hiring-period');
    const pay = payInput.value;
    //check if pay is a number
    if (isNaN(pay)) {
      alert('Pay must be a number');
      return;
    }
    //get skills from the items of skill-list
    const skills = [];
    for (let i = 0; i < skillInput.children.length; i++) {
      const li = skillInput.children[i];
      const skill = li.innerText;
      skills.push(skill.toLowerCase());
    }
    const workStudy = workStudyCheckbox.checked;
    const hiringPeriod = hiringPeriodSelect.value;
    const filteredJobs = this.jobs.filter(job => {
      // Apply the filters
      if (pay && job.pay <= parseFloat(pay)) {
        return false;
      }
      if (skills.length > 0 && !skills.some(skill => job.skills.map(j => j.toLowerCase()).includes(skill))) {
        return false;
      }
      if (!workStudy) {
        return false;
      }
      if (hiringPeriod !== 'Any' && !job.hiringPeriod.includes(hiringPeriod)) {
        return false;
      }
      return true;
    });
    if (filteredJobs.length === 0) {
      alert('No results found');
      return;
    }
    
    
    jobListElm = await new jobList(filteredJobs).render();
    this.#jobBoardViewElm.innerHTML = '';
    this.#jobBoardViewElm.appendChild(jobListElm);
    this.#jobBoardViewElm.appendChild(curJobElm);

  });
    
    this.#applicationsViewElm = await new jobList(this.user._jobsApplied).render();
    
    this.#navigateTo('jobBoard');

    this.#events.subscribe('navigateTo', view => {this.#navigateTo(view); navbar.view = view});
    this.#events.subscribe('job clicked', async job => {
      if (window.location.hash === '#jobBoard'){
        let oldJobElm = document.getElementById(curJobElm.id);
        if (oldJobElm){
          oldJobElm.style.backgroundColor = '#E2E8F0';
          document.getElementById(`job-${job._id}`).style.backgroundColor = 'lightgray';
        }        
      }
      this.#jobBoardViewElm.removeChild(curJobElm);
      curJobElm = await new CurrentJob(job).render();
      curJobElm.id = `job-${job._id}`;
      this.#jobBoardViewElm.appendChild(curJobElm);
    });
    this.#events.subscribe('applied to job', async job => {
      this.jobs = this.jobs.filter(jobListing => {
        return !(JSON.stringify(job) === JSON.stringify(jobListing))
      });
      await db.modifyJob(this.jobs);
      this.user._jobsApplied.push(job);
      await db.modifyUser(this.user);
      this.#jobBoardViewElm.removeChild(curJobElm);
      this.#jobBoardViewElm.removeChild(jobListElm);
      this.#applicationsViewElm = await new jobList(this.user._jobsApplied).render();

      curJobElm = await new CurrentJob(this.jobs[0]).render();
      jobListElm = await new jobList(this.jobs).render();

      this.#jobBoardViewElm.appendChild(jobListElm);
      this.#jobBoardViewElm.appendChild(curJobElm);
    })
  }

  #navigateTo(view) {
    this.#mainViewElm.innerHTML = '';
    if (view === 'jobBoard') {
      this.#mainViewElm.appendChild(this.#jobBoardViewElm);
      let searchElm = document.getElementById('search-bar');
      if (searchElm){
        searchElm.style.display = 'flex';
      }
      
    } else if (view === 'applications') {
      // TODO: this is where we want to add the archive view
      this.#mainViewElm.appendChild(this.#applicationsViewElm);
      let searchElm = document.getElementById('search-bar');
      if (searchElm){
        searchElm.style.display = 'none';
      }
    } 
    else if (view === 'profile') {
      this.#mainViewElm.appendChild(this.#profileViewElm);

      let searchElm = document.getElementById('search-bar');
      if (searchElm){
        searchElm.style.display = 'none';
      }
      
      document.getElementById('ps').value = this.user._personalStatement || "Enter a personal statement here";
      document.getElementById('submit').addEventListener('click', async e => {
        this.user._personalStatement = document.getElementById('ps').value;
        await db.modifyUser(this.user);
        alert('Personal statement saved');
      });
      document.getElementById('resume').addEventListener('click', e => {
        alert('Not implemented yet');
      });
    }
    else {
      
    }
    window.location.hash = view;
  }
}
