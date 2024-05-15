import { NavBar } from "./components/NavBar.js";
import { Dashboard } from "./components/Dashboard.js";
import { Profile } from './components/Profile.js';
import { NewJob } from './components/NewJob.js';
import { CurJob } from "./components/CurJob.js";
import { db } from './utilities/db.js';
import { DashboardFunc } from "./components/DashboardFunc.js";


export class App {
    #rootElem;
    #navbarElem;
    #profileElem;
    #dashboardElem;
    #newJobElem;
    #jobs;
    #user;
    constructor (){
        this.#rootElem = null;
        this.#navbarElem = null;
        this.#profileElem = null;
        this.#dashboardElem = null;
        this.#newJobElem = null;
        this.#jobs = new db('jobpost');
        this.#user = null;
    }
    async render(root){
        //set root element
        this.#user = JSON.parse(localStorage.getItem('loggedInUser'));
        this.#rootElem = document.getElementById(root);
        this.#rootElem.innerHTML = '';
        
        //set navbar Elem
        this.#navbarElem = document.createElement('div');
        const navbar = new NavBar(); //create navbar component
        this.#navbarElem.appendChild(await navbar.render());
        this.#rootElem.appendChild(this.#navbarElem);
        
        //set profile Elem
        this.#profileElem = document.createElement('div');
        this.#profileElem.id = "profile";
        this.#profileElem.classList.add("hidden");
        const profile = new Profile(); //create profile component
        this.#profileElem.appendChild(await profile.render(this.#user));
        this.#rootElem.appendChild(this.#profileElem);

        //set dashboard Elem
        this.#dashboardElem = document.createElement('div');
        this.#dashboardElem.id = "dashboard";
        this.#dashboardElem.classList.add("hidden", "grid", "grid-cols-1", "gap-4", "p-4");
        const dashboardFunc = new DashboardFunc();
        this.#dashboardElem.appendChild(dashboardFunc.render());
        const dashDiv = document.createElement('div');
        dashDiv.classList.add("grid", "md:grid-cols-2");
        const dashboard = new Dashboard(); //create dashboard component
        dashboard.setJobs(await this.#jobs.loadAllJobs());
        dashDiv.appendChild(dashboard.render());
        const curJob = new CurJob();
        dashDiv.appendChild(curJob.render());
        this.#dashboardElem.appendChild(dashDiv);
        this.#rootElem.appendChild(this.#dashboardElem);

        //set newJob Elem
        this.#newJobElem = document.createElement('div');
        this.#newJobElem.id = "newjob";
        this.#newJobElem.classList.add("hidden");
        const form = new NewJob(); //create newJob component
        this.#newJobElem.appendChild(form.render());
        this.#rootElem.appendChild(this.#newJobElem);
        
        //handle clicks on navbar links
        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const viewId = link.getAttribute("href").substring(1);
                this.showView(viewId);
            });
        });

        //handle clicking on deleteAllJobs button
        const deleteAllJobs = document.getElementById('delete-all');
            deleteAllJobs.addEventListener('click', async (event) => {
                event.preventDefault();
                const res = await this.#jobs.deleteAll();
                const newJobs = await this.#jobs.loadAllJobs();
                dashboard.setJobs(newJobs);
                document.getElementById('all-jobs').remove();
                dashDiv.appendChild(dashboard.render());
        })

        //handle clicking on newJob Button
        const newJob = document.getElementById("newJob");
        const formAlert = document.getElementById('form-alert');
        newJob.addEventListener('click', async (event) => {
            event.preventDefault();
            form.view = 'new';
            form.clear();
            formAlert.innerText = '';
        })
        
        //handle empty fields in newJobForm
        const title = document.getElementById('title');
        const brief = document.getElementById('brief');
        const description = document.getElementById('description');
        title.addEventListener('keyup', () => {
            title.classList.remove('border-4', 'border-red-500');
        })
        brief.addEventListener('keyup', () => {
            brief.classList.remove('border-4', 'border-red-500');
        })
        description.addEventListener('keyup', () => {
            description.classList.remove('border-4', 'border-red-500');
        })
        
        //handle clicking on addSkills button
        const addSkills = document.getElementById('addSkills');
        const skills = document.getElementById('skills');
        const skillsList = document.getElementById('skills-list');
        addSkills.addEventListener('click', async (event) => {
            event.preventDefault();
            if (skills.value !== ''){
                const skillElement = document.createElement('span');
                skillElement.classList.add('rounded-lg', 'text-white', 'px-2', 'mt-2');
                skillElement.style.backgroundColor = 'crimson';
                skillElement.textContent = skills.value;
                skillElement.value = skills.value;
                skills.value = '';
                skillsList.appendChild(skillElement);
            }
        });
        
        //handle saving of newJobForm
        const addNewJob = document.getElementById('addNewJob');
        addNewJob.addEventListener('click', async (e) => {
            e.preventDefault();
            const job = await form.submit();
            if (job !== -1) {
                try{
                    const jobItem = await this.#jobs.getJob(job.getId());
                    if (jobItem !== -2){
                        const savedId = await this.#jobs.modifyJob(job);
                        formAlert.innerText = `Job with id ${savedId} modified successfully!`;
                        dashboard.setJobs(await this.#jobs.loadAllJobs());
                        const wrap = document.getElementById('all-jobs-wrap');
                        wrap.innerHTML = '';
                        wrap.appendChild(dashboard.render());
                        form.view = 'new';
                    }
                    else {
                        const savedId = await this.#jobs.saveJob(job);
                        formAlert.innerText = `Job with id ${savedId} saved successfully!`;
                        dashboard.setJobs(await this.#jobs.loadAllJobs());
                        const wrap = document.getElementById('all-jobs-wrap');
                        wrap.innerHTML = '';
                        wrap.appendChild(dashboard.render());
                        form.view = 'new';
                    }
                }
                catch(err){
                    formAlert.innerText = `Couldn't save job. ${err}`;
                }
            }
        })
        
        //handle editing description of profile page (not saving)
        const editDesc = document.getElementById("edit-profile-desc");
        const profileDesc = document.getElementById('profile-description');
        const descValue = document.getElementById('desc-value');
        const alertDesc = document.getElementById("alert-description");

        editDesc.addEventListener('click', async (event) => {
            event.preventDefault();
            const profileInput = await profile.getNewDescription();
            profileDesc.appendChild(profileInput);
            profileInput.addEventListener('keyup', async (e) => {
                    if (e.key === 'Enter'){
                        if (!e.target.value){
                            alertDesc.innerText = 'can\'t add empty description!';
                            setTimeout(() => {
                                alertDesc.innerText = ''; 
                            }, 3000)
                            descValue.classList.remove('hidden');
                            descValue.innerText = await profile.getDescription();
                            profileInput.classList.add('hidden');
                        }
                        else {
                            await profile.setDescription(e.target.value);
                            descValue.classList.remove('hidden');
                            descValue.innerText = e.target.value;
                            profileInput.classList.add('hidden');
                        }
                    }
                })
        })

        //handle saving of profile page with description
        const saveDesc = document.getElementById('saveDesc');
        saveDesc.addEventListener('click', async() => {
            if (descValue.classList.contains('hidden')){
                alert('couldn\'t save, please stop editing text');
            }
            else {
                const descToSet = await profile.getDescription();
                const curDesc = localStorage.getItem('profile-desc');
                if (descToSet !== curDesc){
                    localStorage.setItem('profile-desc', descToSet);
                    await profile.render(this.#user);
                    alert('saved successfully!');
                }
            }
        })   
        //handle deletion of dashboard jobs
        this.#dashboardElem.addEventListener('click', async (event) => {
            event.preventDefault();
            if (event.target.id.startsWith('jobdelete')){
                const curId = event.target.id.toString().slice(9);
                try {
                    const res = await this.#jobs.deleteJob(curId);
                    const newJobs = await this.#jobs.loadAllJobs();
                    dashboard.setJobs(newJobs);
                    document.getElementById(`job${res}`).remove();
                }
                catch(err){
                    console.log(err);
                }
            }
        })

        //handle editing of jobs
        this.#dashboardElem.addEventListener('click', async (event) => {
            event.preventDefault();
            if (event.target.id.startsWith('jobopen')){
                const curId = event.target.id.toString().slice(7);
                try {
                    const res = await this.#jobs.getJob(curId);
                    form.view = 'edit';
                    this.showView('newjob');
                    await form.loadJobDetails(res);
                }
                catch(err){
                    console.log(err);
                }
            }
        })

        //handle clicking expand
        this.#dashboardElem.addEventListener('click', async (event) => {
            event.preventDefault();
            if (event.target.id.startsWith('jobexpand')){
                const curId = event.target.id.toString().slice(9);
                try {
                    const res = await this.#jobs.getJob(curId);
                    curJob.setJob(res);
                    const wrap = document.getElementById('cur-job-wrap');
                    wrap.innerHTML = '';
                    wrap.appendChild(curJob.render());
                }
                catch(err){
                    console.log(err);
                }
            }
        })

        //handle closing of job element in curjob
        this.#dashboardElem.addEventListener('click', async (event) => {
            event.preventDefault();
            if (event.target.id.startsWith('job-contraction')){
                try {
                    curJob.setJob('');
                    const wrap = document.getElementById('cur-job-wrap');
                    wrap.innerHTML = '';
                    wrap.appendChild(curJob.render());
                }
                catch(err){
                    console.log(err);
                }
            }
        })

        //Available Views: 'dashboard', 'newjob', 'profile'
        this.showView('dashboard');
    }
    
    //renders different views
    showView(viewId){
        const views = [this.#profileElem, this.#dashboardElem, this.#newJobElem];
        views.forEach(view => {
            view.classList.add('hidden');
        })
        document.getElementById(viewId).classList.remove('hidden');
    }
}