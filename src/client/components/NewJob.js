import { Job } from "../utilities/job.js";
import * as nanoid from 'https://esm.run/nanoid';

export class NewJob {
    constructor() {
        this.view = "new";
    }

    async clear(){
        let id = document.getElementById('job-id');
        let title = document.getElementById('title');
        let brief = document.getElementById('brief');
        let pay = document.getElementById('pay');
        let skills = document.getElementById('skills-list');
        let hours = document.getElementById('hours');
        let location = document.getElementById('location');
        let description = document.getElementById('description');
        let workstudy = document.getElementById('work-study');
        let hiringPeriod = Array.from(document.querySelectorAll('input[type = "checkbox"]:checked')).map(e => e.value);
        let formAlert = document.getElementById('form-alert');
        id.value = nanoid.nanoid(15);
        title.value = '';
        brief.value = '';
        pay.value = 15;
        skills.value = '';
        hours.value = 20;
        location.value = 'on-campus';
        description.value = '';
        workstudy.value = 'Yes';
        skills.innerHTML = '';
        document.getElementById('payValLabel').innerText = '15';
        document.getElementById('hoursValLabel').innerText = '20';
        Array.from(document.querySelectorAll('input[type = "checkbox"]')).forEach(e => e.checked = false);
    }

    async submit(){
        let id = document.getElementById('job-id');
        let title = document.getElementById('title');
        let brief = document.getElementById('brief');
        let pay = document.getElementById('pay');
        let skills = document.getElementById('skills-list');
        let hours = document.getElementById('hours');
        let location = document.getElementById('location');
        let description = document.getElementById('description');
        let workstudy = document.getElementById('work-study');
        let hiringPeriod = Array.from(document.querySelectorAll('input[type = "checkbox"]:checked')).map(e => e.value);
        let formAlert = document.getElementById('form-alert');
        const date = new Date();
        const day = date.getDate().toString();
        const month = (date.getMonth() + 1).toString(); 
        const year = (date.getFullYear()).toString();
        const postingDate = month + '/' + day + '/' + year;
        //handle empty fields
        const fields = [title, brief, description]
        const emptyFields = fields.map(e => e.value).filter(e => !e);
        if (emptyFields.length > 0){
            fields.forEach(field => {
                if (!field.value) field.classList.add('border-4', 'border-red-500');
            })
            formAlert.innerHTML = 'Please fill out all required fields!';
            return -1;
        }
        //create new job object
        const job = new Job (id.value, title.value, brief.value, pay.value, Array.from(skills.childNodes).map(s => s.value).filter(e => e), hours.value, location.value, description.value, workstudy.value, postingDate, hiringPeriod);
        //reset elements of form after submission
        this.clear();
        return job;
    }

    async loadJobDetails(job) {
        this.clear();
        if (job) {
            document.getElementById('job-id').value = job._id;
            document.getElementById('title').value = job.title;
            document.getElementById('brief').value = job.brief;
            document.getElementById('pay').value = job.pay;
            document.getElementById('hours').value = job.hours;
            document.getElementById('location').value = job.location;
            document.getElementById('description').value = job.description;
            document.getElementById('work-study').value = job.workStudy;
            document.getElementById('payValLabel').innerText = job.pay;
            document.getElementById('hoursValLabel').innerText = job.hours;
            document.getElementById('form-alert').innerText = '';
            const skillsList = document.getElementById('skills-list');
            job.skills.forEach(skill => {
                const skillElement = document.createElement('span');
                skillElement.classList.add('rounded-lg', 'text-white', 'px-2', 'mt-2');
                skillElement.style.backgroundColor = 'crimson';
                skillElement.innerText = skill;
                skillElement.value = skill;
                skillsList.appendChild(skillElement);
            });
            job.hiringPeriod.forEach(period => {
                document.getElementById(period.toLowerCase()).checked = true;
            });
            document.getElementById('addNewJob').innerText = 'Modify Job';
        }
    }

    render() {
        const div = document.createElement('div'); 
        div.innerHTML = /*html*/`
    <h1 class="flex items-center justify-center text-4xl font-bold p-4 text-burgundy capitalize mt-5 mb-5">Create a new job listing</h1>
    <form class = "max-w-4xl p-6 mx-auto bg-burgundy shadow-md mt-6">
        <div class="grid grid-cols-1 gap-6 mt-2">
            <div>
                <label class="mb-4 font-semibold text-pearl-white">Job ID</label>
                <input readonly value = ${nanoid.nanoid(15)} id="job-id" class="w-auto block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring">
            </div>
            <div>
                <label class="mb-4 font-semibold text-pearl-white">Title*</label>
                <input id="title" class="w-1/2 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring">
            </div>
            <div>
                <label class="mb-4 font-semibold text-pearl-white">Brief Description*</label>
                <input id="brief" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring">
            </div>
            <div class = "grid grid-cols-2">
                <div class = :a>
                    <label class="mb-4 font-semibold text-pearl-white">Pay* (in $)</label>
                    <input id="pay" type="range" oninput="document.getElementById('payValLabel').innerHTML = this.value"
                    min = "15" max = "35" step = "0.25" value = "15" class="block w-2/3 py-2 mt-2 accent-coral-red text-gray-700 bg-white border border-gray-300 rounded-md transition ease-in">
                    <span class="text-pearl-white" id="payValLabel" style="font-normal">15</span>
                </div>
                <div>
                    <label class="mb-4 font-semibold text-pearl-white">Hours*</label>
                    <input id="hours" type="range" oninput="document.getElementById('hoursValLabel').innerHTML = this.value"
                    min = "1" max = "40" step = "1" value = "20" class="block w-2/3 py-2 mt-2 accent-coral-red text-gray-700 bg-white border border-gray-300 rounded-md">
                    <span class="text-pearl-white" id="hoursValLabel" style="font-normal">20</span>
                </div>
            </div>
            <div class = "grid grid-cols-1">
                <div>
                    <label class="mb-4 font-semibold text-pearl-white">Skills</label>
                </div>
                <div class = "flex">
                    <input id="skills" class="block px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-crimson focus:outline-none focus:ring">
                    <button id = "addSkills" class="ml-2 border border-pearl-white transition ease-in transition-colors duration-200 transform rounded hover:bg-rosewood bg-burgundy text-pearl-white py-2 px-3 font-mono">+ Add</button>
                </div>
                <div id = "skills-list" class = "mt-2 gap-6">  
                </div>
            </div>
            <div>
                <div class="grid grid-cols-3 gap-6 mt-2">
                <div>
                <label class="mb-4 font-semibold text-pearl-white">Location*</label>
                <select id = "location" class="block max-w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring">
                    <option value = "on-campus">On-campus</option>
                    <option value = "off-campus">Off-campus</option>
                </select>
                </div>
                <div>
                <label class="mb-4 font-semibold text-pearl-white">Work-Study*</label>
                <select id = "work-study" class="block max-w-1/2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring">
                    <option>Yes</option>
                    <option>No</option>
                    <option>Either</option>
                </select>
                </div>
                <div class = "mb-4">
                <label class="block font-semibold text-pearl-white">Hiring Period*</label>
                <ul class="w-48 text-sm font-medium border border-gray-200 rounded-lg">
                    <li class="w-full border-b border-gray-200 rounded-t-lg">
                        <div class="flex items-center ps-3">
                            <input id="summer" type="checkbox" value="Summer" class="w-4 h-4 text-pearl-white rounded focus:ring-blue-500 focus:ring-2">
                            <label for="summer" class="w-full py-3 ms-2 text-sm font-medium text-pearl-white">Summer</label>
                        </div>
                    </li>
                    <li class="w-full border-b border-gray-200 rounded-t-lg">
                        <div class="flex items-center ps-3">
                            <input id="spring" type="checkbox" value="Spring" class="w-4 h-4 text-pearl-white rounded focus:ring-blue-500 focus:ring-2">
                            <label for="summer" class="w-full py-3 ms-2 text-sm font-medium text-pearl-white">Spring</label>
                        </div>
                    </li>
                    <li class="w-full border-b border-gray-200 rounded-t-lg">
                        <div class="flex items-center ps-3">
                            <input id="fall" type="checkbox" value="Fall" class="w-4 h-4 text-pearl-white rounded focus:ring-blue-500 focus:ring-2">
                            <label for="fall" class="w-full py-3 ms-2 text-sm font-medium text-pearl-white">Fall</label>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
            <div>
                <label class="mb-4 font-semibold text-pearl-white">Description*</label>
                <textarea id="description" type="textarea" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"></textarea>
            </div>
        </div>
        <div class="flex justify-end mt-6">
            <button id = "addNewJob" class="border border-pearl-white transition ease-in transition-colors duration-200 transform rounded hover:bg-rosewood bg-burgundy text-pearl-white py-2 px-3 font-mono">Add Job</button>
        </div>
        <div id = "form-alert" class="flex justify-end font-light text-s text-pearl-white">
        </div>
    </form>
        `;
        return div;
    }
}