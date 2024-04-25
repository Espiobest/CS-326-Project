import { Events } from "./Events.js";

export class NavBar {
  #events = null;

  constructor(view) {
    this.view = view;
    this.#events = Events.events();
  }

  async render() {
    // Create the navigation bar element
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <div class="heading">
        <div class="mx-auto max-w-screen-sm flex flex-wrap justify-between px-4">
          <img class="rounded-full w-32 h-32" src="./assets/logo.png" alt="JobsForUMass logo">
          <div class="mx-auto px-4 py-8">
            <div class="flex justify-between">
              <h1 class="text-4xl font-mono font-bold text-black mb-8">JobsForUMass
                <a class="fa-solid fa-user-circle fa-2x" style="margin-left:auto" href="profile" id="profile"> </a>
              </h1>
            </div>
            <button id="reset-state">Clear Slate</button>
            <a href="#jobBoard" class="text-lg font-bold hover:underline">Jobs</a>
            <span class="mx-3 text-gray-500">|</span>
            <a href="applications" class="text-lg font-bold hover:underline">Applications</a>
          </div>
        </div>
      </div>
    `;

    // Get all the anchor tags within the <div> element
    const links = nav.querySelectorAll('a');

    // Add event listeners to each anchor tag
    links.forEach(link => {
      link.addEventListener('click', async e => {
        // Prevent the default anchor tag behavior
        e.preventDefault();

        // Get the view name from the href attribute
        const view = e.target.getAttribute('href').replace('#', '');

        // Update the window's hash to reflect the current view
        window.location.hash = view;

        // Call the navigateTo function with the view name
        await this.#events.publish('navigateTo', view);
      });
    });

    // Return the rendered navigation bar element
    return nav;
  }
}
