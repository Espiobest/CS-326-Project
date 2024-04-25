export class JobListItem {
    constructor(job) {
      this.job = job;
    }
  
    async render() {
      // Create the main container for the job list item
      const curJobDiv = document.createElement('div');
      curJobDiv.classList.add('bg-slate-200', 'rounded-lg', 'p-5', 'mb-5');
      curJobDiv.id = `job-${this.job.id}`;
  
      // Create and append the job title
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
  
      // Create and append the job location
      const location = document.createElement('p');
      location.classList.add('text-base');
      location.textContent = `Location: ${this.job._location} `;
      curJobDiv.appendChild(location);
  
      // Return the rendered job list item element
      return curJobDiv;
    }
  }