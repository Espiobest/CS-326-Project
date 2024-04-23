import { jobSpoof } from './job.js';

import { NavBar } from './NavBar.js';
import { Store } from './store.js';
import { User } from './user.js';
import { jobBoard } from './jobBoard.js';
import { Events } from './Events.js';
export class App {
  #profileViewElm = null;
  #mainViewElm = null;
  #applicationsViewElm = null;
  #jobBoardViewElm = null;
    #events = null;
  constructor() {
    this.user = new User();
    this.#events = Events.events();
  }

  async render(root) {
    const rootElm = document.getElementById(root);
    rootElm.innerHTML = '';

    const navbarElm = document.createElement('div');
    navbarElm.id = 'navbar';
    const navbar = new NavBar('jobBoard');
    navbarElm.appendChild(await navbar.render());

    this.#mainViewElm = document.createElement('div');
    this.#mainViewElm.id = 'main-view';

    rootElm.appendChild(navbarElm);
    rootElm.appendChild(this.#mainViewElm);

    const jb = new jobBoard();
    this.#jobBoardViewElm = await jb.render();

    this.#navigateTo('jobBoard');

    this.#events.subscribe('navigateTo', view => this.#navigateTo(view));
  }

  #navigateTo(view) {
    this.#mainViewElm.innerHTML = '';
    if (view === 'jobBoard') {
      this.#mainViewElm.appendChild(this.#jobBoardViewElm);
      window.location.hash = view;
    } else if (view === 'applications') {
      // TODO: this is where we want to add the archive view
      const archive = document.createElement('div');
      archive.innerHTML = '<h1>Archive view (coming soon)</h1>';
      this.#mainViewElm.appendChild(archive);
      window.location.hash = view;
    } else {
      this.#mainViewElm.appendChild(this.todolist);
      window.location.hash = 'todolist';
    }
  }
}
