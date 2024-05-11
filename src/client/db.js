
import { User } from "./user.js";
var database = new PouchDB("JobsDB");

export async function initDB(){
  // add empty jobList and user data if database is empty
  database.info().then(async function (result) {
    if(result.doc_count === 0) {
      await database.put({ _id: 'job', jobs: [] });
      await database.put({ _id: 'user', user: new User()});
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
  database.get('job').then(function(doc) {
    return database.put({
      _id: 'job',
      _rev: doc._rev,
      jobs: jobList
    });
  }).catch(err => {
    throw new Error(`Failed to modify job: ${err.message}`);
  })
}

/**
  * Asynchronously retrieves the user from the database.
  *
  * @async
  * @throws {Error} - Throws an error if the counter cannot be found or if there
  * is a database issue.
*/
export async function modifyUser(user) {
  database.get('user').then(function(doc) {
    database.put({
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
  const jobs = await database.get("job");
  return jobs.jobs;
}


/** Asynchronously clears the database by resetting the job list and user data.
 * 
 * @async
 * @throws {Error} - Throws an error if the operation fails
 */
export async function clearDB(){
  await modifyJob([]);
  await modifyUser(new User());
}

export async function loginUser(email, password) {
  const result = await database.allDocs({
    include_docs: true,
    selector: { email },
  });

  console.log(result.rows);

  const filterData = result.rows.filter(doc => doc.id === email);

  console.log(filterData);


  if (filterData.length === 0) {
    return null;
  }

  const user = filterData[0].doc;

  if (user.password !== password) {
    console.log('Login failed: Incorrect password');
    return null;
  }

  console.log('Login successful:', user);
  return user;
}

export async function createUser(email, password, accountType) {
  const user = {
    _id: email,
    password,
    accountType,
    name: '',
    jobsApplied: [],
  };

  await database.put(user);

  console.log('User signed up:', user);
  return user;
}

// Generate a random id
// function generateId() {
//   return Math.random().toString(36).substr(2, 9);
// }