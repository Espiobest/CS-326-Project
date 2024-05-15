export class NavBar {
    constructor() {
    }

    async render() {
        const nav = document.createElement('nav');
        nav.classList.add('bg-burgundy', 'py-4');
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
        </div>
        `
        return nav;
    }
}