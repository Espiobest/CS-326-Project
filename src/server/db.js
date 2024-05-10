
import { User } from "../user.js";
import PouchDB from "pouchdb";
const users = new PouchDB("users");
const jobs = new PouchDB("jobs");

export async function initDB(){
  users.info();
  jobs.info();
}


export async function loadJobs() {
  try {
    const list = (await jobs.allDocs({include_docs: true})).rows.map(row => row.doc);
    return list;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addJob(job) {
  try {
    console.log(job);
    await jobs.put(job);
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function modifyJob(job) {
  try {
    const jobwRev = await jobs.get(job._id);
    await jobs.remove(jobwRev);
    
    await jobs.put(job);
    
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getJob(id) {
  try {
    return jobs.get(id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteJob(id) {
  try {
    const job = await jobs.get(id);
    await jobs.remove(job);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function addUser(user) {
  try {
    await users.put(user);
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
    const userwRev = await users.get(user._id);
    await users.remove(userwRev);
    await users.put(user);
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




/** Asynchronously clears the database by resetting the job list and user data.
 * 
 * @async
 * @throws {Error} - Throws an error if the operation fails
 */
export async function clearDB(){
  await modifyJob([]);
  await modifyUser(new User());
}