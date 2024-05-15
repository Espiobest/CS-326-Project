import express from 'express';
import * as db from './db.js';
import * as utils from './utils.js';
import cors from 'cors';
const PORT = 4000;

const app = express();
app.use(cors())
app.use(express.json())

const headerFields = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"};

export async function loadJobs(response) {
  try {
    const list = (await db.loadJobs());
    response.writeHead(200, headerFields);
    response.write(JSON.stringify(list));
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}

export async function addJob(job, response) {
  try {
    await db.addJob(job);
    response.writeHead(200, headerFields);
    response.write("job added");
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}



export async function modifyJob(job, response) {
  try {
    await db.modifyJob(job);
    response.writeHead(200, headerFields);
    response.write("job modified");
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}

export async function getJob(id, response) {
  try {
    const job = await db.getJob(id);
    response.writeHead(200, headerFields);
    response.write(JSON.stringify(job));
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}

export async function deleteJob(id, response) { 
  try {
    await db.deleteJob(id);
    response.writeHead(200, headerFields);
    response.write("job deleted");
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}
export async function addUser(user, response) { 
  try {
    await db.addUser(user, "test");
    response.writeHead(200, headerFields);
    response.write("user added");
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}

export async function getUser(id, response) { 
  try {
    const user = await db.getUser(id);
    response.writeHead(200, headerFields);
    response.write(JSON.stringify(user));
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}

export async function addNewUser(user, password, response) {
  try {
    await db.addUser(user, password);
    response.writeHead(200, headerFields);
    response.write(JSON.stringify(user));
    response.end();
  } catch (error) {
    response.writeHead(500, headerFields);
    response.write("user exists");
    response.end();
  }
}

export async function addNewEmployer(employer, password, response) {
  try {
    console.log("adding employer", employer);
    await db.addEmployer(employer, password);
    response.writeHead(200, headerFields);
    response.write("employer added");
    response.end();
  } catch (error) {
    console.log("error", error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}

export async function modifyUser(user, response) {
  try {
    await db.modifyUser(user);
    response.writeHead(200, headerFields);
    response.write("user modified");
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}

export async function deleteUser(id, response) {
  try {
    await db.deleteUser(id);
    response.writeHead(200, headerFields);
    response.write("user deleted");
    response.end();
  } catch (error) {
    console.error(error);
    response.writeHead(500, headerFields);
    response.write(error.message);
    response.end();
  }
}


app.get('/jobs', async (req, res) => { 
  await loadJobs(res);

});

app.get('/jobs/:id', async (req, res) => { 
  const id = req.params.id;
  await getJob(id, res);
})

app.post('/jobs', async (req, res) => { 
  const job = req.body;
  await addJob(job, res);
});

app.patch('/jobs', async (req, res) => { //object ids must match
  const job = req.body;
  await modifyJob(job, res);
});

app.delete('/jobs/:id', async (req, res) => { 
  const id = req.params.id;
  await deleteJob(id, res);
});

app.get('/users/:id', async (req, res) => { 
  const id = req.params.id;
  await getUser(id, res);
});

app.post('/users', async (req, res) => { 
  const user = req.body;
  await addUser(user, res);
});

app.post('/newUser', async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  await addNewUser(user, password, res);
});

app.post('/newEmployer', async (req, res) => {
  console.log("BODY", req.body);
  const employer = req.body.employer;
  const password = req.body.password;
  await addNewEmployer(employer, password, res);
});

app.patch('/users/:id', async (req, res) => { //object ids must match
  const user = req.body;
  await modifyUser(user, res);
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  await deleteUser(id, res);
})

app.delete('/deleteAll', async (req, res) => {
  await db.clearDB();
  res.writeHead(200, headerFields);
  res.write("deleted all");
  res.end();
});

async function login(res, type, email, password){
  try {
    let userFromDB;
    if (type === "applicant") {
      userFromDB = await db.getUser(email);
      userFromDB.accountType = "applicant";
    }
    else{
      userFromDB = await db.getEmployer(email);
      userFromDB.accountType = "employer";
    }
    let salt = userFromDB.salt;
    let hash = userFromDB.passwordHash;
    if (utils.validatePassword(password, salt, hash)) {
      console.log("passwords match")
      res.writeHead(200, headerFields);
      res.write(JSON.stringify(userFromDB));
      res.end();
    } else {
      console.log("incorrect password")
      res.writeHead(401, headerFields);
      res.write(JSON.stringify("incorrect password"));
      res.end();
    }
  } catch (error) {
    console.log(error);
    if (error.status === 404) {
      res.writeHead(401, headerFields);
      res.write(JSON.stringify("incorrect email"));
      res.end();
    }
    else{
      res.writeHead(401, headerFields);
      res.write(JSON.stringify(error));
      res.end();
    } 
  }
}

app.post('/login', async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  console.log("email: ", email, "password: ", password);
  
  try{
    login(res, "applicant", email, password);
  }
  catch(err){
    try{
      login(res, "employer", email, password);
    }
    catch(err){
      res.writeHead(401, headerFields);
      res.write(JSON.stringify("incorrect email/password"));
      res.end();
    }
  }  
});

app.post('/logoutUser', async (req, res) => {
  const user = req.body.user;
  const accountType = req.body.accountType;
  console.log(user);
  if (accountType === "applicant") {
    await db.modifyUser(user);
  }
  else{
    await db.modifyEmployer(user);
  }
  res.writeHead(200, headerFields);
  res.write("logged out");
  res.end();
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

