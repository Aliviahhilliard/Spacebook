const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/signup', { // Updated URL
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/picture');
    } else {
      alert('Sign up failed. Please try again.');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);