// SignupScreen.js
import { User } from './user.js';
import { Employer } from './employer.js';

export class SignupScreen {
  #events = null;

  constructor(events, db) {
    this.#events = events;
    this.db = db;
  }

  async render() {
    const signupScreen = document.createElement('div');
    //signupScreen.classList.add('signup-screen', 'bg-gray-100', 'p-6');
    signupScreen.innerHTML = `
    <div class="signup-screen bg-white flex justify-center">
    <div class="signup-form bg-red-600 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-xl sm:text-2xl mb-6 text-center text-black">Sign Up for JobsForUMass</h2>
      <form id="signup" onSubmit="addUser()">
        <div class="mb-4">
          <label for="name" class="block mb-2 text-sm font-medium text-black">Name</label>
          <input type="text" id="name" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2 text-sm font-medium text-black">Email</label>
          <input type="email" id="signup-email" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2 text-sm font-medium text-black">Password</label>
          <input type="password" id="signup-password" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-4">
          <label for="country" class="block mb-2 text-sm font-medium text-black">Location</label>
          <input type="text" id="country" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-4">
        <div class="mb-4">
          <label for="description" class="block mb-2 text-sm font-medium text-black">Description</label>
          <input type="text" id="description" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-black">Account Type:</label>
          <div class="flex items-center">
            <label class="mr-4"><input type="radio" name="account-type" value="applicant" checked class="mr-2">Applicant</label>
            <label><input type="radio" name="account-type" value="employer" class="mr-2">Employer</label>
          </div>
        </div>
        <div>
          <button type="submit" id="signup-btn" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
        </div>
        <div class="mt-4 text-center">
          <a href="#" id="login-link" class="text-blue-500 hover:text-blue-200">Already have an account? Log In</a>
        </div>
      </form>
    </div>
  </div>
    `;

    const signupButton = signupScreen.querySelector('#signup-btn');
    const loginLink = signupScreen.querySelector('#login-link');

    signupButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("signup-email").value;
        const country = document.getElementById("country").value;
        const password = document.getElementById("signup-password").value;
        const accountType = [...document.querySelectorAll('input[name="account-type"]')].filter(input => input.checked)[0].value;
        const description = document.getElementById("description").value;
        console.log(accountType);
        if (accountType === 'employer') {
          const employer = new Employer(name, country, description, email);
          console.log(employer);
          fetch('http://localhost:4000/newEmployer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              employer: employer,
              password: password,
            }),
          }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            alert('Employer already exists');
            throw new Error('Employer already exists');
          }).then((employer) => {
            console.log('Signup successful:', employer);
            localStorage.setItem('user', JSON.stringify(employee));
            this.#events.publish('loggedIn', employer, accountType);
            this.#events.publish('navigateTo', 'jobBoard');
          });
        }
        else{
          const id = Math.floor(Math.random() * 1000);
          const user = new User(id, name, 2026, email, country, description);
          console.log(user);
          fetch('http://localhost:4000/newUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: user,
              password: password,
            })
          }).then((response) => {
            if (response.ok) {
              return response.json();
            }
            alert('User already exists');
            throw new Error('User already exists');
          }).then((user) => {
            console.log('Signup successful:', user);
            localStorage.setItem('user', JSON.stringify(user));
            this.#events.publish('loggedIn', user, accountType);
            this.#events.publish('navigateTo', 'jobBoard');
          });
        }
      });

    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.#events.publish('navigateTo', 'login');
    });

    return signupScreen;
  }

  addUser() {
    console.log("Adding user");
  }
}