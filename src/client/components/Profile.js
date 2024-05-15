import { Employer } from "../utilities/employer.js";
export class Profile {
    #employer;
    // #name;
    // #location;
    // #description;
    // #email;
    constructor() {
    }

    async setDescription(description){
        this.#employer.setDescription(description);
    }

    async getDescription(){
        return this.#employer.getDescription();
    }

    async getNewDescription(){
        const descValue = document.getElementById('desc-value');
        const profileInput = document.getElementById('profile-input');
        const curDesc = descValue.textContent.trimEnd().trimStart();
        profileInput.value = curDesc;
        descValue.classList.add('hidden');
        profileInput.classList.remove('hidden');
        return profileInput;
    }

    async render(user) {
        this.#employer = new Employer(user.name, user.location, user.description, user.email);
        const div = document.createElement('div');
        div.classList.add('bg-pearl-white', 'p-3', 'shadow-md'); 
        div.innerHTML = /*html*/`
            <div class="flex items-center space-x-2 font-semibold text-gray-900">
                <span class="text-burgundy">
                    <img class="rounded-sm w-5 h-5 hover:bg-rosewood focus:bg-rosewood bg-burgundy" src="./assets/about.svg" alt="Edit Button">
                </span>
                <span class = "font-mono text-burgundy">About</span>
            </div>
            <div>
                <div class="grid md:grid-cols-1 text-sm">
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold text-rosewood">Name of Agency</div>
                        <div class="px-4 py-2 text-charcoal">${this.#employer.getName()}</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold text-rosewood">Location</div>
                        <div class="px-4 py-2 text-charcoal">${this.#employer.getLocation()}</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold text-rosewood">Public Description</div>
                        <div class="px-4 py-2 text-charcoal">
                            <span id = "profile-description">
                                <span id = "desc-value">${this.#employer.getDescription()}</span>
                                <input id = "profile-input" class = "hidden h-50 border-2 border-burgundy focus:border-burgundy" type = "textarea"/>
                            </span>
                            <span>
                                <button id="edit-profile-desc">
                                    <img class="rounded-sm w-5 h-5 hover:bg-rosewood focus:bg-rosewood bg-burgundy" src="./assets/edit-button.svg" alt="Edit Button">
                                </button>
                            </span>
                            <span id = "alert-description" class = "font-light text-xs text-crimson">
                            </span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2">
                        <div class="px-4 py-2 font-semibold text-rosewood">Email</div>
                        <div class="px-4 py-2 text-crimson">
                            <a class="underline text-crimson visited:text-charcoal" href="mailto:${this.#employer.getEmail()}">${this.#employer.getEmail()}</a>
                        </div>
                    </div>
                </div>
                <div>
                    <button id = "saveDesc" class = "transition ease-in transition-colors duration-200 transform rounded hover:bg-rosewood bg-burgundy text-pearl-white py-2 px-3 font-mono">
                        Save
                    </button>
                </div>
            </div>
        `;
        return div;
    }
}