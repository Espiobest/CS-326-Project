import { jobSpoof } from './job.js';
import { Store } from './store.js';
import {JobListItem} from './JobListItem.js';
import { CurrentJob } from './currentJob.js';
export class jobBoard {
    constructor() {
        this.jobs =  Store.store().get("jobs") || jobSpoof();
        Store.store().set("jobs", this.jobs);
    }
    async render() {
        const rootElm = document.createElement('div');
        rootElm.classList.add('md:block');

        const searchButton = document.createElement('button');
        searchButton.id = 'search';
        searchButton.classList.add('rounded', 'bg-burgundy', 'border-2', 'hover:bg-rosewood', 'hover:border-red-950', 'hover:border-2', 'text-white', 'py-2', 'px-3', 'font-mono');
        searchButton.innerText = 'Search';
        rootElm.appendChild(searchButton);

        const containerElm = document.createElement('div');
        containerElm.classList.add('flex', 'mb-4');
        rootElm.appendChild(containerElm);

        const leftElm = document.createElement('div');
        leftElm.classList.add('w-1/2', 'bg-white', 'h-screen', 'overflow-y-scroll', 'rounded');

        for (const job in this.jobs) {
            
            const item = new JobListItem(this.jobs[job]);
            const elm = await item.render()
            leftElm.appendChild(elm);
        }
        
        containerElm.appendChild(leftElm);

        const rightElm = document.createElement('div');
        rightElm.classList.add('w-1/2', 'bg-gray-500', 'h-screen');
        const curJob = new CurrentJob(this.jobs[0]);
        rightElm.appendChild(await curJob.render());
        containerElm.appendChild(rightElm);

        rootElm.appendChild(containerElm);

        return rootElm;

    }
}