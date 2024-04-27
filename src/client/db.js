
import { User } from "./user.js";
const db = new PouchDB("JobsDB");

export async function initDB(){
  // add empty jobList and user data if database is empty
  db.info().then(async function (result) {
    if(result.doc_count === 0) {
      await db.put({ _id: 'job', jobs: [] });
      await db.put({ _id: 'user', user: new User()});
    }
  });
}

/**
 * Asynchronously modifies an existing job object in the database.
 *
 * @async
 * @param {Array} jobList - The updated job list to store.
 * @throws {Error} - Throws an error if the operation fails, e.g., the counter
 * does not exist or database issues.
 */
export async function modifyJob(jobList) {
  db.get('job').then(function(doc) {
    return db.put({
      _id: 'job',
      _rev: doc._rev,
      jobs: jobList
    });
  }).catch(err => {
    throw new Error(`Failed to modify job: ${err.message}`);
  });
}

/**
  * Asynchronously retrieves the user from the database.
  *
  * @async
  * @throws {Error} - Throws an error if the counter cannot be found or if there
  * is a database issue.
*/
export async function modifyUser(user) {
  db.get('user').then(function(doc) {
    return db.put({
      _id: 'user',
      _rev: doc._rev,
      user: user
    });
  }).catch(err => {
    throw new Error(`Failed to modify user: ${err.message}`);
  });
}

/**
 * Asynchronously retrieves the user from the database.
 * 
 * @async
 * @returns {Promise<Object>} - A promise that resolves to the user object.
 * @throws {Error} - Throws an error if the counter cannot be found or if there
 * is a database issue.
 */


export async function getUser() {
  const user = await db.get("user");
  return user.user;
}


export async function getUserAppliedJobs() {
  const user = await db.get("user");
  return user.user.jobsApplied;
}


/**
 * Asynchronously retrieves jobs from the database.
 *
 * @async
 * @returns {Promise<Object>} - A promise that resolves to the job list.
 * @throws {Error} - Throws an error if the counter cannot be found or if there
 * is a database issue.
 */
export async function loadJobs() {
  const jobs = await db.get("job");
  return jobs.jobs;
}


/**
 * 
 */
export async function clearDB(){

  db.get('user').then(function(doc) {
    return db.put({
      _id: 'user',
      _rev: doc._rev,
      user: new User()
    });
  }).catch(err => {
    throw new Error(`Failed to modify job: ${err.message}`);
  });

  db.get('job').then(function(doc) {
    return db.put({
      _id: 'job',
      _rev: doc._rev,
      jobs: []
    });
  }).catch(err => {
    throw new Error(`Failed to modify job: ${err.message}`);
  });
}