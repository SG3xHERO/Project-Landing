// This code will be saved as complete/login.js

// Set the password
const CORRECT_PASSWORD = "itteam";

// Check if user is already authenticated
function checkAuth() {
  return sessionStorage.getItem("authenticated") === "true";
}

// Function to verify the password
function verifyPassword() {
  const passwordInput = document.getElementById("password-input").value;
  
  if (passwordInput === CORRECT_PASSWORD) {
    // Set authentication in session storage
    sessionStorage.setItem("authenticated", "true");
    
    // Redirect to the complete version
    window.location.href = "index.html";
  } else {
    // Show error message
    document.getElementById("error-message").textContent = "Incorrect password. Please try again.";
    document.getElementById("error-message").classList.remove("hidden");
  }
}

// Function to create and show the password modal
function showPasswordModal() {
  // Create the modal HTML
  const modalHTML = `
    <div id="password-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full border border-pink-500/30">
        <h2 class="text-2xl font-bold text-pink-400 mb-4">Authentication Required</h2>
        <p class="text-gray-300 mb-6">Please enter the password to access the complete version:</p>
        <input 
          type="password" 
          id="password-input" 
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white mb-4"
          placeholder="Enter password"
        >
        <p id="error-message" class="text-red-400 mb-4 hidden"></p>
        <div class="flex justify-between">
          <button 
            id="cancel-button" 
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded shadow text-white text-sm font-semibold transition"
          >
            Cancel
          </button>
          <button 
            id="submit-button" 
            class="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded shadow text-white text-sm font-semibold transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Add the modal to the document
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);
  
  // Add event listeners
  document.getElementById("submit-button").addEventListener("click", verifyPassword);
  document.getElementById("cancel-button").addEventListener("click", function() {
    // Redirect back to the landing page
    window.location.href = "../index.html";
  });
  
  // Allow pressing Enter to submit
  document.getElementById("password-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      verifyPassword();
    }
  });
  
  // Focus the password input
  document.getElementById("password-input").focus();
}

// Function to check authentication on page load
function initializeAuth() {
  if (!checkAuth()) {
    showPasswordModal();
  }
}

// Initialize when the page loads
window.addEventListener("DOMContentLoaded", initializeAuth);