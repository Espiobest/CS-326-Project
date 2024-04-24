import { Events } from './Events.js';
import { JobListItem } from './JobListItem.js';
export class jobList {
    #events = null;
    jobs = null;
    constructor(jobs) {
        this.#events = Events.events()
        this.jobs = jobs;
    }
    
    async render() {
        const rootElm = document.createElement('div');
        rootElm.classList.add('w-1/2', 'bg-white', 'h-screen', 'overflow-y-scroll', 'rounded');

        for (const index in this.jobs) {
            const job = this.jobs[index];
            const item = new JobListItem(job);
            const elm = await item.render();
            elm.addEventListener("click", () => {
                this.#events.publish('job clicked', job);
            });
            rootElm.appendChild(elm);
        }
        //this.#events.subscribe('applied to job', job)
        return rootElm;
    }
}