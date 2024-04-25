import { App } from './App.js';
import * as db from './db.js';
// Mount the application to the root element.
const app = new App();
await app.render('root');

// Testing Support
const resetState = async () => {
  await db.clearDB();
  await db.initDB();
  const app = new App();
  app.jobs = [];
  app.render('root');
};
document.getElementById('reset-state').addEventListener('click', resetState);