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
        <div class="flex grow flex-wrap items-center mb-4 mr-4">
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
        <div id="job-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-burgundy rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold text-pearl-white" id="job-title">
                    Job Title
                </h3>
                <button id = "jobhidemodal${job._id}" type="button" class="text-gray-400 bg-crimson hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="job-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
            <div class="mb-4">
            <h4 class="font-bold">Brief:</h4>
            <p>${job.brief}</p>
        </div>
        <div class="mb-4">
            <h4 class="font-bold">Pay:</h4>
            <p>${job.pay}</p>
        </div>
        <div class="mb-4">
            <h4 class="font-bold">Skills:</h4>
            <p>${job.skills.join(', ')}</p>
        </div>
        <div class="mb-4">
            <h4 class="font-bold">Hours:</h4>
            <p>${job.hours}</p>
        </div>
        <div class="mb-4">
            <h4 class="font-bold">Location:</h4>
            <p>${job.location}</p>
        </div>
        <div class="mb-4">
            <h4 class="font-bold">Description:</h4>
            <p>${job.description}</p>
        </div>
        <div class="mb-4">
            <h4 class="font-bold">Work Study:</h4>
            <p>${job.workStudy}</p>
        </div>
        <div class="mb-4">
            <h4 class="font-bold">Posting Date:</h4>
            <p>${job.postingDate}</p>
        </div>
        <div class="mb-4">
            <h4 class="font-bold">Hiring Period:</h4>
            <p>${job.hiringPeriod}</p>
        </div>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                <button data-modal-hide="job-modal" type="button" class="text-white bg-crimson hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Apply Now</button>
            </div>
        </div>
    </div>
</div>

        `
        return div;        
    }

    render() {
        const div = document.createElement('div');
        div.id = 'all-jobs';
        div.classList.add('max-w-1/2', 'text-wrap', 'mt-2', 'grid', 'md:grid-cols-2', 'md:grid-flow-dense', 'gap-2', 'mb-4');
        for (const job of this.#jobs) {
            const jobDiv = this.renderJob(job);
            div.appendChild(jobDiv);
        }
        return div;
    }
}