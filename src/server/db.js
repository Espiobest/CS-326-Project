
import _ from "underscore";
import { User } from "../client/user.js";
import * as utils from "./utils.js";
import PouchDB from "pouchdb";
var users = new PouchDB("users");
var employers = new PouchDB("employers");
var jobs = new PouchDB("jobs");

// export async function initDB(){
//   // users.info().then(async function (result) {
//   //   if(result.doc_count === 0) {
//   //     await users.put({ _id: 'user', user: new User(), password: 'admin' });
//   //   }
//   // });
//   jobs.info().then(async function (result) {
//     if(result.doc_count === 0) {
//       await jobs.put({ _id: 'job', jobs: [] });
//     }
//   });
// }


export async function addUser(user, password) {
  try {
    const {salt, passwordHash} = utils.saltHashPassword(password);
    await users.put({
      _id: user._email,
      user: user,
      salt: salt,
      passwordHash: passwordHash,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getUser(id) {
  try {
    return users.get(id);

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function modifyUser(user) {
  try {
    const userwRev = await users.get(user._email);
    let password = userwRev.passwordHash;
    let salt = userwRev.salt;
    await users.remove(userwRev);
    await users.put({
      _id: user.email,
      user: user,
      passwordHash: password,
      salt: salt,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const user = await users.get(id);
    await users.remove(user);
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function getEmployer(id) {
  try {
    return employers.get(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addEmployer(employer, password) {
  try {
    const {salt, passwordHash} = utils.saltHashPassword(password);

    await employers.put({
      _id: employer.email,
      employer: employer,
      salt: salt,
      passwordHash: passwordHash,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function modifyEmployer(employer) {
  try {
    const employerwRev = await employers.get(employer.email);
    let password = employerwRev.passwordHash;
    let salt = employerwRev.salt;
    await employers.remove(employerwRev);
    await employers.put({
      _id: employer.email,
      employer: employer,
      passwordHash: password,
      salt: salt,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteEmployer(id) {
  try {
    const employer = await employers.get(id);
    await employers.remove(employer);
  } catch (error) {
    console.error(error);
    throw error;
  }
}


/** Asynchronously clears the database by resetting the job list and user data.
 * 
 * @async
 * @throws {Error} - Throws an error if the operation fails
 */
export async function clearDB(){
  await users.destroy();
  await employers.destroy();
  await jobs.destroy();
  users = new PouchDB("users");
  employers = new PouchDB("employers");
  // initDB();
}

export async function saveJob(job) {
  try{
    const response = await jobs.put({ _id: job.getId(), ...job });
    if (!response.ok) throw new Error('Could not save job', {cause: response});
    return response.id;
  }
  catch(err){
    throw new Error('Could not reach database', {cause: err});
  }
}
export async function modifyJob(job) {
  try{
    const id = job.getId();
    const response = await jobs.get(id);
    if (!response) throw new Error('Could not access job', {cause: response});
    const data = await jobs.put({ _id: id, ...job, _rev: response._rev});
    if (!data.ok) throw new Error('Could not modify job', {cause: data});
    return data.id;
  }
  catch(err){
    throw new Error('Could not reach database', {cause: err});
  }
}
export async function getJob(id) {
  try{
    const response = await jobs.get(id);
    if (!response) throw new Error('Could not access job', {cause: response});
    return response;
  }
  catch(err){
    return -2;
  }
}
export async function deleteJob(id) {
  try{
    const job = await jobs.get(id);
    const response = await jobs.remove(job);
    if (!response.ok) throw new Error('Could not delete job', {cause: response});
    return response.id;
  }
  catch(err){
    throw new Error('Could not reach database', {cause: err});
  }
}
export async function loadAllJobs() {
  try{
    const response = await jobs.allDocs({ include_docs: true }); 
    if (!response.rows) throw new Error('Could not get jobs', {cause: response});
    const jobs = response.rows.map(row => row.doc);
    return jobs;
  }
  catch(err){
    throw new Error('Could not reach database', {cause: err});
  }
}
export async function deleteAll() {
  return jobs.allDocs()
    .then(res => {
      Promise.all(res.rows.map(row => jobs.remove(row.id, row.value.rev)));
    })
}