export class Profile {
    constructor(view) {
      this.view = view;
    }

    render(){
        const rootElm = `
            <h1 class="text-4xl font-bold text-center">Your Profile</h1>
            <div class="flex justify-center items-center px-4">
                <img src="assets/logo.png" class="w-20 h-20 rounded-full" alt="profile">
                <div class="ml-4">
                    <h2 class="text-xl font-bold">John Doe</h2>
                    <p class="text-gray-500">
                        <span class="font-bold">Email: johndoe@umass.edu</span>
                        <span>
                    </p>
                </div>
            </div>
            <div class="sm-icons flex justify-center items-center m-4">
                <a href="https://www.github.com" target="_blank" class="p-2 fa-brands fa-github fa-4x"></a>
                <a href="https://www.twitter.com" target="_blank" class="p-2 fa-brands fa-twitter fa-4x"></a>
                <a href="https://www.linkedin.com" target="_blank" class="p-2 fa-brands fa-linkedin fa-4x"></a>
                <a class="fa fa-plus fa-4x"></a>
            </div>
            <div class="flex justify-center items-center mt-4">
                <h2 class="text-lg text-center font-bold">Personal Statement</h2>
            </div>
            <input id="ps" type="text" class="align-center border-2 border-gray-200 rounded-lg p-2 w-full">
            <h2 class="text-lg text-center font-bold">Resume</h2>
            <div class="text-center border-2 border-gray-200 rounded-lg w-full" id="resume" style="height: 10%">
                Upload Here <i class="fa fa-upload" aria-hidden="true"></i>
            </div>
            <button id="submit" class="rounded-lg bg-rose-900 text-white p-2 mt-2">Save</button>
        `;
        return rootElm;
    }
  }