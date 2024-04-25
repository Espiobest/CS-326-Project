/**
 * Counter Management Module
 *
 * This module provides a set of asynchronous functions for creating, reading,
 * updating, and deleting counter documents in a PouchDB database. It includes
 * utilities for manipulating individual counters by name, modifying counter
 * values, and fetching all counters stored in the database. The module is built
 * on top of PouchDB, a NoSQL database, to persist counter data.
 *
 * HOWEVER: it can easily be changed to a different data store simply by
 * replacing the PouchDB implementation with another database system.
 *
 * Functions:
 * - `saveCounter(name, count)`: Saves a new counter or updates an existing
 *   counter with the given name and count.
 * - `modifyCounter(doc)`: Updates an existing counter document in the database.
 * - `loadCounter(name)`: Retrieves a counter by its name.
 * - `removeCounter(name)`: Removes a counter from the database by its name.
 * - `loadAllCounters()`: Fetches all counters from the database.
 *
 * Dependencies:
 * - PouchDB: Used for data storage and retrieval operations. Ensure PouchDB is
 *   installed and properly configured.
 *
 * Examples of use:
 * - Creating a counter with a specific name and initial count.
 * - Updating the count of an existing counter.
 * - Fetching the current count of a counter by its name.
 * - Deleting a counter.
 * - Listing all counters stored in the database.
 *
 * Note: This module is currently works with a PouchDB database named
 * 'counters'. Make sure the database is accessible and correctly initialized
 * before using these functions.
 *
 * Note: This module can easily change the database implementation to another
 * database system by changing the import statement and the database connection
 * initialization. The rest of the functions should work as expected with minor
 * modifications.
 */
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

/**
 * Asynchronously retrieves the user's applied jobs from the database.
 * 
 * @async
 * @returns {Promise<Object>} - A promise that resolves to the user's applied jobs list.
 * @throws {Error} - Throws an error if the counter cannot be found or if there
 * is a database issue.
 */
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


/** Asynchronously clears the database by resetting the job list and user data.
 * 
 * @async
 * @throws {Error} - Throws an error if the operation fails
 */
export async function clearDB(){

  db.get('user').then(function(doc) {
    db.put({
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