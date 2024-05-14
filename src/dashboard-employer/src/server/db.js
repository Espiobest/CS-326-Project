export class db {
    constructor(name){
      this.db = new PouchDB(name);
    }
    async saveJob(job) {
      try{
        const response = await this.db.put({ _id: job.getId(), ...job });
        if (!response.ok) throw new Error('Could not save job', {cause: response});
        return response.id;
      }
      catch(err){
        throw new Error('Could not reach database', {cause: err});
      }
    }
    async modifyJob(job) {
      try{
        const id = job.getId();
        const response = await this.db.get(id);
        if (!response) throw new Error('Could not access job', {cause: response});
        const data = await this.db.put({ _id: id, ...job, _rev: response._rev});
        if (!data.ok) throw new Error('Could not modify job', {cause: data});
        return data.id;
      }
      catch(err){
        throw new Error('Could not reach database', {cause: err});
      }
    }
    async getJob(id) {
      try{
        const response = await this.db.get(id);
        if (!response) throw new Error('Could not access job', {cause: response});
        return response;
      }
      catch(err){
        return -2;
      }
    }
    async deleteJob(id) {
      try{
        const job = await this.db.get(id);
        const response = await this.db.remove(job);
        if (!response.ok) throw new Error('Could not delete job', {cause: response});
        return response.id;
      }
      catch(err){
        throw new Error('Could not reach database', {cause: err});
      }
    }
    async loadAllJobs() {
      try{
        const response = await this.db.allDocs({ include_docs: true }); 
        if (!response.rows) throw new Error('Could not get jobs', {cause: response});
        const jobs = response.rows.map(row => row.doc);
        return jobs;
      }
      catch(err){
        throw new Error('Could not reach database', {cause: err});
      }
    }
    deleteAll() {
      return this.db.allDocs()
        .then(res => {
          Promise.all(res.rows.map(row => this.db.remove(row.id, row.value.rev)));
        })
    }
  }