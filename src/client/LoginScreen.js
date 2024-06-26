// LoginScreen.js
import { Events } from './Events.js';
import * as db from './db.js';

export class LoginScreen {
  #events = null;

  constructor(events, db) {
    this.email = '';
    this.password = '';
    this.#events = events;
    this.db = db;
  }

  async render() {
    const loginScreen = document.createElement('div');
    //loginScreen.classList.add('login-screen', 'bg-gray-100', 'p-6');
    loginScreen.innerHTML = `
    <div class="login-screen bg-white min-h-screen flex items-center justify-center">
  <div class="bg-red-600 p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl mb-6 text-center text-black">Log in to JobsForUMass</h2>
    <form>
      <div class="mb-4">
        <label for="email" class="block mb-2 text-sm font-medium text-black">Email</label>
        <input type="email" id="login-email" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-black">Password</label>      
        <input type="password" id="login-password" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div>
        <button type="submit" id="login-btn" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Log In</button>
      </div>
      <div class="mt-4 text-center">
        <a href="#" id="signup-link" class="text-blue-500 hover:text-blue-200">Don't have an account? Sign Up!</a>
      </div>
    </form>
  </div>
</div>
    `;

    const emailInput = loginScreen.querySelector('#login-email');
    const passwordInput = loginScreen.querySelector('#login-password');
    const loginButton = loginScreen.querySelector('#login-btn');
    const signupLink = loginScreen.querySelector('#signup-link');

    loginButton.addEventListener('click', async (e) => {
        e.preventDefault();
        this.email = emailInput.value;
        this.password = passwordInput.value;
        fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })
        .then(async (res)=>(await res.json()))
        .then(async (user) => {
          if (user.accountType === 'applicant'){
            user.user.accountType = 'applicant';
            user = user.user;
          }
          else{
            user.employer.accountType = 'employer';
            user = user.employer;
          }
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          await this.db.modifyUser(user);
          this.#events.publish('loggedIn', user, user.accountType);
          this.#events.publish('navigateTo', 'jobBoard');
        })
        .catch((err) => {
          console.log('Login failed: Invalid email or password', err);
          alert("Incorrect Email or Password");
        })
      });

    signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.#events.publish('navigateTo', 'signup');
    });
    console.log("Returning loginscreen");
    return loginScreen;
  }
}