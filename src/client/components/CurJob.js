export class CurJob {
    #job;
    constructor(){
        this.#job = null;
    }
    setJob(job){
        this.#job = job;
    }
    getJob(job){
        return this.#job;
    }
    async loadAllUsers(job){
        const id = this.#job._id;
    }
    render(){
        const wrapDiv = document.createElement('div');
        wrapDiv.id = 'cur-job-wrap';
        const div = document.createElement('div');
        div.id = 'cur-job';
        if (!this.#job) {
            wrapDiv.appendChild(div);
            wrapDiv.innerHTML = 'nothing for now';
            return wrapDiv;
        };
        div.classList.add('card','rounded-lg', 'bg-burgundy', 'shadow-md', 'text-pearl-white','text-wrap', 'mb-4', 'p-6', 'ml-3', 'mr-3');
        div.innerHTML = /*html*/`
        <div class="border-b-2 border-gray-200 pb-3 mb-3">
            <span class="text-sm bg-crimson font-semibold text-black">Job ID:</span>
            ${this.#job._id}
            <button type="button" id="job-contraction" class="btn bg-crimson text-xs font-medium text-white px-6 py-2 mt-4 rounded transition duration-150 ease-in-out hover:bg-rosewood">
                X
            </button>
        </div>
        <div>
            <h5 class="text-xl font-medium mb-2">${this.#job.title}</h5>
            <div class="mb-4 text-base">${this.#job.brief}</div>
        </div>
        <div class="grid grid-cols-1 items-center mb-4 mr-4">
            <div>
                <span class="text-sm font-bold bg-crimson text-black">Hours Per Week:</span>
                <span class = "text-m font-semibold text-pearl-white">${this.#job.hours}</span>
            </div>
            <div>
                <span class="text-sm font-bold bg-crimson text-black">Hiring Period:</span>
                <span class = "text-m font-semibold text-pearl-white">${this.#job.hiringPeriod.join(', ')}</span>
            </div>
            <div>
                <span class="text-sm bg-crimson font-bold text-black">Skills Required:</span> 
                <span class = "text-m font-semibold text-pearl-white">${this.#job.skills.join(', ')}</span>
            </div>
            <div>
                <span class="text-sm bg-crimson font-bold text-black">Pay:</span>
                <span class = "text-m font-semibold text-pearl-white">${this.#job.pay}</span>
            </div>
            <div>
                <span class="text-sm bg-crimson font-bold text-black">Location:</span>
                <span class = "text-m font-semibold text-pearl-white">${this.#job.location}</span>
                
            </div>
            <div>
                <span class="text-sm bg-crimson font-bold text-black">Description:</span>
                <span class = "text-m font-semibold text-pearl-white">${this.#job.description}</span>
                
            </div>
            <div>
                <span class="text-sm bg-crimson font-bold text-black">Workstudy Status:</span>
                <span class = "text-m font-semibold text-pearl-white">${this.#job.workStudy}</span>
            </div>
            <div>
                <span class="text-sm bg-crimson font-bold text-black">Last modified</span>
                <span class = "text-m font-semibold text-pearl-white">${this.#job.postingDate}</span>
            </div>
        </div>
        `
        return div;
    }
}