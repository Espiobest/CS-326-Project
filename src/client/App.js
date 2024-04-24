import { jobSpoof } from './job.js';

import { NavBar } from './NavBar.js';
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
    // this.#mainViewElm.classList.add('bg-slate-100', 'h-screen', 'overflow-y-auto')

    rootElm.appendChild(navbarElm);
    
    const searchElm = document.createElement('div');
    //make searchElm display elements in a row
    searchElm.style.display = 'flex';

    
    

    const searchInputElm = document.createElement('input');
    searchInputElm.type = 'text';
    searchInputElm.id = 'search-navbar';
    searchInputElm.classList.add('block', 'w-full', 'p-2', 'ps-10', 'text-sm', 'text-gray-900', 'border', 'border-gray-150', 'rounded-lg', 'bg-gray-50', 'focus:ring-charcoal', 'focus:border-charcoal');
    searchInputElm.placeholder = 'Type to filter...';
    searchElm.appendChild(searchInputElm);
    
    const searchButton = document.createElement('button');
    searchButton.id = 'search';
    searchButton.classList.add('rounded', 'bg-burgundy', 'border-2', 'hover:bg-rosewood', 'hover:border-red-950', 'hover:border-2', 'text-white', 'py-2', 'px-3', 'font-mono');
    searchButton.innerText = 'Search';
    searchElm.appendChild(searchButton);
    
    const preferencesButton = document.createElement('div');
    preferencesButton.innerHTML = '<i class="fa-solid fa-sliders"></i>p';
    preferencesButton.style.padding = '4px';

    preferencesButton.addEventListener('click', async e => {
      
    });
    searchElm.appendChild(preferencesButton);
    rootElm.appendChild(searchElm);

    
    
    rootElm.appendChild(this.#mainViewElm);

    let jobListElm = await new jobList(this.jobs).render();
    let curJobElm = await new CurrentJob(this.jobs[0]).render();
    this.#jobBoardViewElm = document.createElement("div");
    this.#jobBoardViewElm.classList.add('flex');
    
    this.#jobBoardViewElm.appendChild(jobListElm);
    this.#jobBoardViewElm.appendChild(curJobElm);
    
    searchInputElm.addEventListener('input', async e => {
      const filter = e.target.value;
      jobListElm = await new jobList(this.jobs.filter(job => job.title.toLowerCase().includes(filter) )).render();
      this.#jobBoardViewElm.innerHTML = '';
      this.#jobBoardViewElm.appendChild(jobListElm);
      this.#jobBoardViewElm.appendChild(curJobElm);
      this.#mainViewElm.appendChild(this.#jobBoardViewElm);
      
    });
    
    this.#applicationsViewElm = await new jobList(this.user._jobsApplied).render();
    
    this.#navigateTo('jobBoard');

    this.#events.subscribe('navigateTo', view => {this.#navigateTo(view); navbar.view = view});
    this.#events.subscribe('job clicked', async job => {
      this.#jobBoardViewElm.removeChild(curJobElm);
      curJobElm = await new CurrentJob(job).render();
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
      
    } else if (view === 'applications') {
      // TODO: this is where we want to add the archive view
      this.#mainViewElm.appendChild(this.#applicationsViewElm);
    } 
    else if (view === 'profile') {

    }
    else {
      
    }
    window.location.hash = view;
  }
}
