import express from 'express';
import * as db from './db.js';
const PORT = 4000;

const app = express();
app.use(express.json())

const headerFields = { "Content-Type": "application/json" };

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
    await db.addUser(user);
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
  console.log(req.body);
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

app.patch('/users/:id', async (req, res) => { //object ids must match
  const user = req.body;
  await modifyUser(user, res);
});

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  await deleteUser(id, res);
})

app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost>:${PORT}`);
});

