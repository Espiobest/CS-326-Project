
import { User } from "../user.js";
import PouchDB from "pouchdb";
const users = new PouchDB("users");
const jobs = new PouchDB("jobs");

export async function initDB(){
  users.info();
  jobs.info();
}


export async function loadJobs() {
  const list = (await jobs.allDocs({include_docs: true})).rows.map(row => row.doc);
  return list;
}

export async function addJob(job) {
  console.log(job);
  await jobs.put(job);
}



export async function modifyJob(job) {
  const jobwRev = await jobs.get(job._id);
  await jobs.remove(jobwRev);
  
  await jobs.put(job);
  
}

export async function getJob(id) {
  return jobs.get(id);
}

export async function deleteJob(id) {
  const job = await jobs.get(id);
  await jobs.remove(job);
}
export async function addUser(user) {
  await users.put(user);
}


export async function getUser(id) {
  return users.get(id);

  
}

export async function modifyUser(user) {
  const userwRev = await users.get(user._id);
  await users.remove(userwRev);
  await users.put(user);
}

export async function deleteUser(id) {
  const user = await users.get(id);
  await users.remove(user);
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