export class User {
    constructor(id, name, graduation, email, location, personalStatement) {
      this.id = id;
      this._name = name;
      this._graduation = graduation;
      this.email = email;
      this._location = location;
      this._profile = '';
      this._personalStatement = personalStatement;
      this._personalLinks = [];
      this._resume = null;
      this._jobsApplied = [];
    }
  
  
    // Getter and setter for name
    get name() {
      return this._name;
    }
    set name(value) {
      this._name = value;
    }
  
    // Getter and setter for graduation
    get graduation() {
      return this._graduation;
    }
    set graduation(value) {
      this._graduation = value;
    }
  
    // Getter and setter for citizenship
    get citizenship() {
      return this._citizenship;
    }
    set citizenship(value) {
      this._citizenship = value;
    }
  
    // Getter and setter for profile
    get profile() {
      return this._profile;
    }
    set profile(value) {
      this._profile = value;
    }
  
    // Getter and setter for personalStatement
    get personalStatement() {
      return this._personalStatement;
    }
    set personalStatement(value) {
      this._personalStatement = value;
    }
  
    // Getter and setter for personalLinks
    get personalLinks() {
      return this._personalLinks;
    }
    set personalLinks(value) {
      this._personalLinks = value;
    }
  
    // Getter and setter for resume
    get resume() {
      return this._resume;
    }
    set resume(value) {
      this._resume = value;
    }
  
    // Getter and setter for jobsApplied
    get jobsApplied() {
      return this._jobsApplied;
    }
    set jobsApplied(value) {
      this._jobsApplied = value;
    }
  
    applyForJob(job) {
      this._jobsApplied.push(job);
    }
  
    getJobsApplied(filter = null) {
      if (filter) {
        return this._jobsApplied.filter(job => job.title.includes(filter) || job.description.includes(filter));
      }
      return this._jobsApplied;
    }
  
    setPersonalStatement(statement) {
      this._personalStatement = statement;
    }
  
    addPersonalLink(link) {
      this._personalLinks.push(link);
    }
  
    setResume(resume) {
      this._resume = resume;
    }
}
  
