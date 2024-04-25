import { Events } from "./Events.js";

export class CurrentJob {
  #events = null;

  constructor(job) {
    // Initialize the events instance and store the job data
    this.#events = Events.events();
    this.job = job;
  }

    async render() {
        const curJobDiv = document.createElement('div');
        curJobDiv.classList.add('w-1/2', 'rounded-lg', 'p-5', 'h-screen');
        curJobDiv.id = `job-${this.job.id}`;

        const h1 = document.createElement('h1');
        h1.classList.add('text-3xl');
        h1.textContent = this.job._title;
        curJobDiv.appendChild(h1);

    // Create and append the job brief
    const h2 = document.createElement('h2');
    h2.classList.add('text-base');
    h2.textContent = this.job._brief;
    curJobDiv.appendChild(h2);

    // Create and append the job skills
    const skills = document.createElement('p');
    skills.classList.add('text-sm');
    skills.textContent = 'Skills: ';
    this.job._skills.forEach(skill => {
      const skillElement = document.createElement('span');
      skillElement.classList.add('skill', 'rounded-lg', 'text-white', 'px-2', 'm-1');
      skillElement.style.backgroundColor = '#ba1b1d';
      skillElement.textContent = skill;
      skills.appendChild(skillElement);
    });
    curJobDiv.appendChild(skills);

    // Create and append the job hours
    const hours = document.createElement('p');
    hours.classList.add('text-base');
    hours.textContent = `Hours per week: ${this.job._hours}`;
    curJobDiv.appendChild(hours);

    // Create and append the job pay
    const pay = document.createElement('p');
    pay.classList.add('text-base');
    pay.textContent = `Pay: $${this.job._pay}`;
    curJobDiv.appendChild(pay);

    // Create and append the company information
    const company = document.createElement('p');
    company.classList.add('text-base');
    curJobDiv.appendChild(company);

        const location = document.createElement('p');
        location.classList.add('text-base');
        location.textContent = `Location:  ${this.job._location} `;
        const applyBtn = document.createElement('input');
        applyBtn.type = 'button';
        applyBtn.value = 'Apply';
        applyBtn.classList.add('bg-blue-300', 'rounded-md', 'p-1', 'ml-5');
        applyBtn.addEventListener('click', () => this.#events.publish('applied to job', this.job));
        location.appendChild(applyBtn);
        curJobDiv.appendChild(location);

        const description = document.createElement('div');
        description.classList.add('h-screen','overflow-y-scroll',  'w-full');
        const fullJob = document.createElement('p');
        fullJob.textContent = `Full Job description: \n`;
        fullJob.appendChild(document.createTextNode(this.job._description));
        description.appendChild(fullJob);
        curJobDiv.appendChild(description);
        // const listDiv = document.getElementById(`job-${this.job.id}`);
        // listDiv.style.backgroundColor = '#f3f4f6';

        return curJobDiv;
    }
}