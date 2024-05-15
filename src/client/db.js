
import { User } from "./user.js";
var database = new PouchDB("JobsDB");

export async function initDB(){
  // add empty jobList if database is empty
  database.allDocs({include_docs: true}).then(function(result) {
    let ids = result.rows.filter(row => row.id === 'job' || row.id === 'user').map(row => row.id);
    if (!ids.includes('job')) {
      database.put({ _id: 'job', jobs: [] });
    }
    if (!ids.includes('user')) {
      database.put({ _id: 'user', user: new User(), accountType: "" });
    }
  });
}

/**
  * Asynchronously retrieves the user from the database.
  *
  * @async
  * @throws {Error} - Throws an error if the counter cannot be found or if there
  * is a database issue.
*/
export async function modifyUser(user, accountType) {
  database.get('user').then(function(doc) {
    database.put({
      _id: 'user',
      _rev: doc._rev,
      user: user,
      accountType: accountType,
    });
  }).catch(err => {
    console.log(err);
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

  try{
    const user = await database.get("user");
    return user.user;
  }
  catch(err){
    const user = new User();
    database.put({
      _id: 'user',
      user: new User(),
    });
    return user;
  }
}

/**
 * Asynchronously retrieves the user's applied jobs from the database.
 * 
 * @async
 * @returns {Promise<Object>} - A promise that resolves to the user's applied jobs list.
 * @throws {Error} - Throws an error if the counter cannot be found or if there
 * is a database issue.
 */
export async function getUserAppliedJobs() {
  const user = await database.get("user");
  return user.user._jobsApplied;
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
  try{
    const jobs = await database.get("job");
    return jobs.jobs;
  }
  catch(err){
    await database.put({ _id: 'job', jobs: [] });
    return [];
  }
}


export async function modifyJob(jobs){
  database.get('job').then(function(doc) {
    database.put({
      _id: 'job',
      _rev: doc._rev,
      jobs: jobs,
    });
  }).catch(err => {
    console.log(err);
    throw new Error(`Failed to modify jobs: ${err.message}`);
  });


}

/** Asynchronously clears the database by resetting the job list and user data.
 * 
 * @async
 * @throws {Error} - Throws an error if the operation fails
 */
export async function clearDB(){
  await database.destroy();
  console.log("Database cleared");
  database = new PouchDB("JobsDB");
  // initDB();
}


// Generate a random id
// function generateId() {
//   return Math.random().toString(36).substr(2, 9);
// }