export class DashboardFunc {
    constructor() {
    }
    render() {
        const div = document.createElement('div');
        div.innerHTML = /*html*/`
        <button id = "delete-all" class = "transition-colors duration-200 transform rounded hover:bg-rosewood bg-burgundy text-pearl-white mt-2 ml-3 py-2 px-3 font-mono">
            Delete All
        </button>
        `;
        return div;
    }
}