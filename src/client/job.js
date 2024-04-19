class Job {
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
  
  module.exports = Job;