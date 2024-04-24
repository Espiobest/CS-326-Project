import { jobList } from "./jobList.js";

export class applications {
    
    constructor(applications) {
        this.applications = applications;
    }

    async render () {
        return new jobList(applications).render();
    }
}