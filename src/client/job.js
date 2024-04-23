export class Job {
    constructor(id, title, brief, pay, skills, hours, name, location, description) {
      this._id = id;
      this._title = title;
      this._brief = brief;
      this._pay = pay;
      this._skills = skills;
      this._hours = hours;
      this._name = name;
      this._location = location;
      this._description = description;
    }
  
    // Getter and setter for id
    get id() {
      return this._id;
    }
    set id(value) {
      this._id = value;
    }
  
    // Getter and setter for title
    get title() {
      return this._title;
    }
    set title(value) {
      this._title = value;
    }
  
    // Getter and setter for brief
    get brief() {
      return this._brief;
    }
    set brief(value) {
      this._brief = value;
    }
  
    // Getter and setter for pay
    get pay() {
      return this._pay;
    }
    set pay(value) {
      this._pay = value;
    }
  
    // Getter and setter for skills
    get skills() {
      return this._skills;
    }
    set skills(value) {
      this._skills = value;
    }
  
    // Getter and setter for hours
    get hours() {
      return this._hours;
    }
    set hours(value) {
      this._hours = value;
    }
  
    // Getter and setter for name
    get name() {
      return this._name;
    }
    set name(value) {
      this._name = value;
    }
  
    // Getter and setter for location
    get location() {
      return this._location;
    }
    set location(value) {
      this._location = value;
    }
  
    // Getter and setter for description
    get description() {
      return this._description;
    }
    set description(value) {
      this._description = value;
    }
}

// job spoof function
function jobSpoof() {
  let jobs = [];
  for (let i = 0; i < 20; i++) {
    jobs.push(new Job(
      i,
      fakeText(5, 10),
      fakeText(10, 20),
      Math.floor(Math.random() * 20) + 10,
      fakeArray(5, () => fakeText(5, 10)),
      Math.floor(Math.random() * 40) + 10,
      fakeText(5, 10),
      fakeText(5, 10),
      fakeText(10, 20)
    ));
  }
  return jobs;

  function fakeText(min, max) {
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    let text = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz ';
    for (let i = 0; i < length; i++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
  }

  function fakeArray(length, itemGen) {
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(itemGen());
    }
    return array;
  }

}


function layoutJob(job) {
  const jobDiv = document.createElement('div');
  jobDiv.classList.add('bg-slate-200', 'rounded-lg', 'p-5');

  const h1 = document.createElement('h1');
  h1.classList.add('text-3xl');
  h1.textContent = job.title;
  jobDiv.appendChild(h1);

  const h2 = document.createElement('h2');
  h2.classList.add('text-base');
  h2.textContent = job.smallDesc;
  jobDiv.appendChild(h2);

  const skills = document.createElement('p');
  skills.classList.add('text-sm');
  skills.textContent = 'Skills: ';
  job.skills.forEach(skill => {
    const skillElement = document.createElement('span');
    skillElement.classList.add('skill');
    skillElement.textContent = skill;
    skills.appendChild(skillElement);
  });
  jobDiv.appendChild(skills);

  const hours = document.createElement('p');
  hours.classList.add('text-base');
  hours.textContent = `Hours per week: ${job.hours}`;
  jobDiv.appendChild(hours);

  const pay = document.createElement('p');
  pay.classList.add('text-base');
  pay.textContent = `Pay: $${job.pay}`;
  jobDiv.appendChild(pay);

  const company = document.createElement('p');
  company.classList.add('text-base');
  company.textContent = `Company: ${job.company}`;
  jobDiv.appendChild(company);

  const location = document.createElement('p');
  location.classList.add('text-base');
  location.textContent = `Location:  ${job.location} `;
  const applyBtn = document.createElement('input');
  applyBtn.type = 'button';
  applyBtn.value = 'Apply';
  applyBtn.classList.add('bg-blue-300', 'rounded-md', 'p-1', 'ml-5');
  location.appendChild(applyBtn);
  jobDiv.appendChild(location);

  const description = document.createElement('div');
  description.classList.add('overflow-scroll');
  const fullJob = document.createElement('p');
  fullJob.textContent = `Full Job description: `;
  fullJob.appendChild(document.createTextNode(job.desc));
  description.appendChild(fullJob);
  jobDiv.appendChild(description);

  return jobDiv;
}


function layoutJobList(jobList) {
  const jobDivList = document.createElement('div');
  jobDivList.classList.add('flex', 'flex-wrap');
  jobList.forEach(job => {
    const jobDiv = layoutJob(job);
    jobDivList.appendChild(jobDiv);
  });
  return jobDivList;
}


