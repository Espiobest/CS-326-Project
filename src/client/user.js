class User {
    constructor(id, name, major, gpa, address, graduation, phone, email, citizenship) {
      this._id = id;
      this._name = name;
      this._major = major;
      this._gpa = gpa;
      this._address = address;
      this._graduation = graduation;
      this._phone = phone;
      this._email = email;
      this._citizenship = citizenship;
      this._profile = '';
      this._personalStatement = '';
      this._personalLinks = [];
      this._resume = null;
      this._jobsApplied = [];
    }
  
    // Getter and setter for id
    get id() {
      return this._id;
    }
    set id(value) {
      this._id = value;
    }
  
    // Getter and setter for name
    get name() {
      return this._name;
    }
    set name(value) {
      this._name = value;
    }
  
    // Getter and setter for major
    get major() {
      return this._major;
    }
    set major(value) {
      this._major = value;
    }
  
    // Getter and setter for gpa
    get gpa() {
      return this._gpa;
    }
    set gpa(value) {
      this._gpa = value;
    }
  
    // Getter and setter for address
    get address() {
      return this._address;
    }
    set address(value) {
      this._address = value;
    }
  
    // Getter and setter for graduation
    get graduation() {
      return this._graduation;
    }
    set graduation(value) {
      this._graduation = value;
    }
  
    // Getter and setter for phone
    get phone() {
      return this._phone;
    }
    set phone(value) {
      this._phone = value;
    }
  
    // Getter and setter for email
    get email() {
      return this._email;
    }
    set email(value) {
      this._email = value;
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
  
module.exports = User;