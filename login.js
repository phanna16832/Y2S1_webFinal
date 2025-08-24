document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const messageArea = document.getElementById('message-area');

    // Function to display messages
    function displayMessage(message, type = 'error') {
        messageArea.textContent = message;
        if (type === 'error') {
            messageArea.style.color = '#ff4d4d'; // Red for errors
        } else {
            messageArea.style.color = '#4CAF50'; // Green for success
        }
    }

    // Tab switching functionality
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginFormContainer.classList.add('active');
        signupFormContainer.classList.remove('active');
        messageArea.textContent = ''; // Clear messages when switching tabs
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupFormContainer.classList.add('active');
        loginFormContainer.classList.remove('active');
        messageArea.textContent = ''; // Clear messages when switching tabs
    });

    // Password visibility toggle
    document.querySelectorAll('.password-toggle-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const passwordInput = icon.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            icon.classList.toggle('fa-eye-slash');
            icon.classList.toggle('fa-eye');
        });
    });

    // Handle Login Form Submission
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the form from submitting in the default way

        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;

        // Check for the specific admin credentials
        if (username === 'admin' && password === '1234') {
            displayMessage('Login successful! Redirecting...', 'success');
            // Redirect to the home page (index.html) after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000); // 1-second delay
        } else {
            displayMessage('Invalid username or password. Please try again.');
        }
    });

    // Handle Signup Form Submission
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop the form from submitting in the default way

        const username = document.getElementById('username-signup').value;
        const phone = document.getElementById('phone-signup').value;
        const password = document.getElementById('password-signup').value;

        // A very basic check to ensure fields are not empty
        if (username && phone && password) {
            displayMessage('Signup successful! Redirecting to home page...', 'success');
            // In a real app, you'd send this data to a server.
            // For now, we'll just redirect to the home page.
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000); // 1-second delay
        } else {
            displayMessage('Please fill in all fields for signup.');
        }
    });
});
