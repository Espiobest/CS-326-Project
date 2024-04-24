export class NavBar {
    constructor(view) {
        this.view = view;
    }

    async render() {
        const nav = document.createElement('nav'); 
        nav.innerHTML = `
                <div class="heading">
                    <div class="mx-auto max-w-screen-sm flex flex-wrap justify-between px-4">
                        <img class = "rounded-full w-32 h-32" src = "assets/logo.png" alt ="JobsForUMass logo">
                        <div class="mx-auto px-4 py-8">
                            <h1 class="text-4xl font-mono font-bold text-black mb-8">JobsForUMass</h1>
                            <button id="reset-state">Clear Slate</button>
                            <a href="#${this.view === 'jobBoard' ? '' : 'jobBoard'}" class="${this.view !== 'jobBoard' ? 'text-lg font-bold text-burgundy' : 'text-lg font-bold text-burgundy-light'}">Jobs</a>
                            <span class="mx-3 text-gray-500">|</span>
                            <a href="${this.view === 'applications' ? '' : 'applications'}" class="${this.view !== 'applications' ? 'text-lg font-bold text-burgundy' : 'text-lg font-bold text-burgundy-light'}">Applications</a>
                        </div>
                    </div>
                </div>
            
            `;
            return nav
    }
}


