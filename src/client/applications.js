import { jobList } from "./jobList.js";

export class applications {
  constructor(applications) {
    this.applications = applications;
  }

  async render() {
    // Render the job list using the provided applications data
    return new jobList(applications).render();
  }
}