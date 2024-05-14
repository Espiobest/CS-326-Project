export class CurJob {
    #job;
    constructor(job){
        this.#job = job;
    }
    setJob(job){
        this.#job = job;
    }
    getJob(job){
        return this.#job;
    }
    render(job){
        const jobModal = document.getElementById('job-modal');
        const jobTitle = document.getElementById('job-title');
        const jobDescription = document.getElementById('job-description');
        const closeButton = document.querySelector('[data-modal-hide="job-modal"]');
        
        if (this.getJob()) {
            jobTitle.textContent = this.getJob().title;
            jobDescription.textContent = this.getJob().description;
        }
        
        // Show the modal
        jobModal.classList.remove('hidden');

        closeButton.addEventListener('click', () => {
            jobModal.classList.add('hidden');
        });
    }
}