import { App } from "./app.js";

export const fetchEmployerDash = async() => {
    const app = new App();
    const div = document.createElement('div');
    div.id = 'employer-root';
    await app.render('employer-root');
    return div;
}