import { jobSpoof } from './job.js';

import { NavBar } from './NavBar.js';
import * as db from "./db.js";
import { User } from './user.js';

import { Events } from './Events.js';
import { jobList } from './jobList.js';
import { CurrentJob } from './currentJob.js';

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
    rootElm.appendChild(this.#mainViewElm);

    let jobListElm = await new jobList(this.jobs).render();
    let curJobElm = await new CurrentJob(this.jobs[0]).render();
    this.#jobBoardViewElm = document.createElement("div");
    this.#jobBoardViewElm.classList.add('flex');
    this.#jobBoardViewElm.appendChild(jobListElm);
    this.#jobBoardViewElm.appendChild(curJobElm);
    
    this.#navigateTo('jobBoard');

    this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
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
      window.location.hash = view;
    } else if (view === 'applications') {
      // TODO: this is where we want to add the archive view
      const archive = document.createElement('div');
      archive.innerHTML = '<h1>Archive view (coming soon)</h1>';
      this.#mainViewElm.appendChild(archive);
      window.location.hash = view;
    } 
    else if (view === 'profile') {

    }
    else {
      this.#mainViewElm.appendChild(this.todolist);
      window.location.hash = 'todolist';
    }
  }
}
