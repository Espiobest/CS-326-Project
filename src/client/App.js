import { jobSpoof } from './job.js';

import { NavBar } from './NavBar.js';
import { Store } from './store.js';
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
    this.user = Store.store().get("user") || new User();
    Store.store().set("user", this.user);
    this.#events = Events.events();
    this.jobs =  Store.store().get("jobs") || jobSpoof();
    
  }

  async render(root) {
    const rootElm = document.getElementById(root);
    rootElm.innerHTML = '';

    const navbarElm = document.createElement('div');
    navbarElm.id = 'navbar';
    const navbar = new NavBar('jobBoard');
    navbarElm.appendChild(await navbar.render());

    this.#mainViewElm = document.createElement('div');
    this.#mainViewElm.id = 'main-view';

    rootElm.appendChild(navbarElm);
    rootElm.appendChild(this.#mainViewElm);

    let jobListElm = await new jobList(this.jobs).render();
    let curJobElm = await new CurrentJob(this.jobs[0]).render();
    this.#jobBoardViewElm = document.createElement("div");
    this.#jobBoardViewElm.classList.add('flex');
    this.#jobBoardViewElm.appendChild(jobListElm);this.#jobBoardViewElm.appendChild(curJobElm);
    
    this.#navigateTo('jobBoard');

    this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
    this.#events.subscribe('job clicked', async job => {
      this.#jobBoardViewElm.removeChild(curJobElm);
      curJobElm = await new CurrentJob(job).render();
      this.#jobBoardViewElm.appendChild(curJobElm);

    });
    this.#events.subscribe('applied to job', async job => {
      this.jobs = this.jobs.filter(jobListing => {
        console.log(!(JSON.stringify(job) === JSON.stringify(jobListing)));
        return !(JSON.stringify(job) === JSON.stringify(jobListing))
      });
      Store.store().set("jobs", this.jobs);
      this.user._jobsApplied.push(job);
      Store.store().set("user", this.user);
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
