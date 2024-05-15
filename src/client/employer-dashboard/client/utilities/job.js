export class Job {
    #id;
    constructor(id, title, brief, pay, skills, hours, location, description, workStudy, postingDate, hiringPeriod) {
      this.#id = id;
      this.title = title;
      this.brief = brief;
      this.pay = pay;
      this.skills = skills;
      this.hours = hours;
      this.location = location;
      this.description = description;
      this.workStudy = workStudy;
      this.postingDate = postingDate;
      this.hiringPeriod = hiringPeriod;
    }
    getId(){
      return this.#id;
    }
}