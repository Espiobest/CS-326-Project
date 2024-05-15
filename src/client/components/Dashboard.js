export class Dashboard {
    #jobs;
    constructor() {
        this.#jobs = [];
    }
    setJobs(jobs){
        this.#jobs = jobs;
    }
    renderJob(job){
        const div = document.createElement('div');
        div.id = `job${job._id}`;
        div.classList.add('card','rounded-lg', 'bg-burgundy', 'shadow-md', 'text-pearl-white','text-wrap', 'mb-4', 'p-6', 'ml-3', 'mr-3');
        div.innerHTML = /*html*/`
        <div class="border-b-2 border-gray-200 pb-3 mb-3">
            <span class="text-sm bg-crimson font-semibold text-black">Job ID:</span> ${job._id}
        </div>
        <div>
            <h5 class="text-xl font-medium mb-2">${job.title}</h5>
            <div class="mb-4 text-base">${job.brief}</div>
        </div>
        <div class="flex flex-wrap items-center mb-4 mr-4">
            <div>
                <span class="text-sm font-semibold bg-crimson text-black">Hours Per Week:</span> ${job.hours}
            </div>
            <div>
                <span class="text-sm font-semibold bg-crimson text-black">Hiring Period:</span> ${job.hiringPeriod.join(', ')}
            </div>
            <div>
                <span class="text-sm bg-crimson font-semibold text-black">Skills Required:</span> ${job.skills.join(', ')}
            </div>
        </div>
        <div class="flex items-center justify-around border-t-2 border-gray-200 pt-3">
            <div>
                <button type="button" id="jobopen${job._id}" class="btn bg-crimson text-xs font-medium text-white px-6 py-2 mt-4 rounded transition duration-150 ease-in-out hover:bg-rosewood">
                        Edit
                </button>
            </div>
            <div>
                <button type="button" id="jobexpand${job._id}" class="btn bg-crimson text-xs font-medium text-white px-6 py-2 mt-4 rounded transition duration-150 ease-in-out hover:bg-rosewood">
                        Expand
                </button>
            </div>
            <div>
                <button type="button" id="jobdelete${job._id}" class="btn bg-crimson text-xs font-medium text-white px-6 py-2 mt-4 rounded transition duration-150 ease-in-out hover:bg-rosewood">
                        Delete
                </button>
            </div>
        </div>
        `
        return div;        
    }

    render() {
        const wrapDiv = document.createElement('div');
        wrapDiv.id = 'all-jobs-wrap';
        const div = document.createElement('div');
        wrapDiv.appendChild(div);
        div.id = 'all-jobs';
        div.classList.add('max-w-1/2', "grid", "sm:grid-cols-1", "md:grid-cols-2", 'text-wrap', 'mt-2', 'flex', 'gap-2', 'mb-4');
        if (!this.#jobs) return wrapDiv;
        for (const job of this.#jobs) {
            const jobDiv = this.renderJob(job);
            div.appendChild(jobDiv);
        }
        return wrapDiv;
    }
}