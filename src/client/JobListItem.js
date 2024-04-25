export class JobListItem {
    constructor(job) {
      this.job = job;
    }
  
    async render() {
        const curJobDiv = document.createElement('div');
        curJobDiv.classList.add('bg-slate-200', 'rounded-lg', 'p-5', 'mb-5');
        curJobDiv.id = `job-${this.job._id}`

        const h1 = document.createElement('h1');
        h1.classList.add('text-3xl');
        h1.textContent = this.job._title;
        curJobDiv.appendChild(h1);

        const h2 = document.createElement('h2');
        h2.classList.add('text-base');
        h2.textContent = this.job._brief;
        curJobDiv.appendChild(h2);

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

        const hours = document.createElement('p');
        hours.classList.add('text-base');
        hours.textContent = `Hours per week: ${this.job._hours}`;
        curJobDiv.appendChild(hours);

        const pay = document.createElement('p');
        pay.classList.add('text-base');
        pay.textContent = `Pay: $${this.job._pay}`;
        curJobDiv.appendChild(pay);

        const location = document.createElement('p');
        location.classList.add('text-base');
        location.textContent = `Location:  ${this.job._location} `;
        curJobDiv.appendChild(location);

        const workStudy = document.createElement('p');
        workStudy.classList.add('text-base');
        workStudy.textContent = `Work Study: ${this.job._workStudy ? 'Yes' : 'No'}`;
        curJobDiv.appendChild(workStudy);

        const hiringPeriod = document.createElement('p');
        hiringPeriod.classList.add('text-base');
        hiringPeriod.textContent = `Hiring Period: ${this.job._hiringPeriod.join(', ')}`;
        curJobDiv.appendChild(hiringPeriod);

        return curJobDiv;
    }
}
    