import { Events } from './Events.js';
import { JobListItem } from './JobListItem.js';

export class jobList {
  #events = null;
  jobs = null;

  constructor(jobs) {
    // Initialize the events instance and store the job data
    this.#events = Events.events();
    this.jobs = jobs;
  }

  async render() {
    // Create the main container for the job list
    const rootElm = document.createElement('div');
    rootElm.classList.add('w-1/2', 'bg-white', 'h-screen', 'overflow-y-auto', 'rounded');

    let i = 0;
    for (const index in this.jobs) {
      const job = this.jobs[index];
      const item = new JobListItem(job);
      const elm = await item.render();
      if (i == 0) {
        elm.style.backgroundColor = 'lightgray';
      }
      i++;
      elm.addEventListener("click", () => {
        this.#events.publish('job clicked', job);
      });
      rootElm.appendChild(elm);
    }

    // Return the rendered job list element
    return rootElm;
  }
}