import { Events } from "../Events.js";


export class NavBar {
    #events;
    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const nav = document.createElement('nav');
        nav.classList.add('bg-burgundy', 'py-4', 'heading');
        nav.innerHTML = /*html*/`
        <div class="px-5 container flex items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 mr-auto">
            <img class="w-24 h-24 rounded-full" src="./assets/logo.png" alt="JobsForUMass logo">
        </div>
        
        <!-- Navigation Links -->
        <div class="flex items-center">
            <a href="#dashboard" id = "dashboard-text" class="mr-6 text-pearl-white font-bold hover:text-gray-300">Dashboard</a>
            <a href="#newjob" id = "newJob" class="mr-6 text-pearl-white font-bold hover:text-gray-300">Create/Edit Job</a>
        </div>
        
        <!-- User Profile -->
        <div class="px-5 flex-shrink-0 ml-auto">
            <a href="#profile">
                <img class="w-24 h-24 rounded-full bg-rosewood hover:bg-burgundy focus:bg-burgundy" src="./assets/profile.svg" alt="User Profile Picture">
            </a>
        </div>
        <button id="logout" class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Logout</button>
        </div>
        `
        
        const logout = nav.querySelector('#logout');
        logout.addEventListener('click', async e => {
        e.preventDefault();
        await this.#events.publish('logout');
        });
        return nav;
    }
}