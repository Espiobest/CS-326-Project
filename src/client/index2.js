import { App } from "./EmployerApp.js";

export const fetchEmployerDash = async() => {
    const app = new App();
    // const div = document.createElement('div');
    // div.id = 'root';
    let div = document.getElementById('root');
    await app.render('root');
    return div;
}