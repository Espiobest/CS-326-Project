export class Employer {
    name;
    location;
    description;
    email;
    constructor(name, location, description, email) {
        this.name = name;
        this.location = location;
        this.description = description;
        this.email = email;
    }
    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setLocation(location){
        this.location = location;
    }
    getLocation(){
        return this.location;
    }
    setDescription(description){
        this.description = description;
    }
    getDescription(){
        return this.description;
    }
    setEmail(email){
        this.email = email;
    }
    getEmail(){
        return this.email;
    }   
}