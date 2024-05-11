// SignupScreen.js
import { Events } from './Events.js';
import * as db from './db.js';

export class SignupScreen {
  #events = null;

  constructor(events, db) {
    this.email = '';
    this.password = '';
    this.accountType = 'applicant';
    this.#events = events;
    this.db = db;
  }

  async render() {
    const signupScreen = document.createElement('div');
    //signupScreen.classList.add('signup-screen', 'bg-gray-100', 'p-6');
    signupScreen.innerHTML = `
    <div class="signup-screen bg-white min-h-screen flex items-center justify-center">
    <div class="bg-red-600 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl mb-6 text-center text-black">Sign Up for JobsForUMass</h2>
      <form>
        <div class="mb-4">
          <label for="email" class="block mb-2 text-sm font-medium text-black">Email</label>
          <input type="email" id="signup-email" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2 text-sm font-medium text-black">Password</label>
          <input type="password" id="signup-password" required class="w-full px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
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

    const emailInput = signupScreen.querySelector('#signup-email');
    const passwordInput = signupScreen.querySelector('#signup-password');
    const accountTypeInputs = signupScreen.querySelectorAll('input[name="account-type"]');
    const signupButton = signupScreen.querySelector('#signup-btn');
    const loginLink = signupScreen.querySelector('#login-link');

    signupButton.addEventListener('click', async (e) => {
        e.preventDefault();
        this.email = emailInput.value;
        this.password = passwordInput.value;
        this.accountType = [...accountTypeInputs].find(input => input.checked).value;
        const user = await this.db.createUser(this.email, this.password, this.accountType);
        console.log('Signup successful:', user);
        this.#events.publish('loggedIn', user);
        this.#events.publish('navigateTo', 'jobBoard');
      });

    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.#events.publish('navigateTo', 'login');
    });

    return signupScreen;
  }
}