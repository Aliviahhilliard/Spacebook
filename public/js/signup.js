const name = document.querySelector('#signup-username').value.trim();
const email = document.querySelector('#signup-email').value.trim();
const password = document.querySelector('#signup-password').value.trim();
const image = document.querySelector('#signup-image')

const signupFormHandler = async (event) => {
  event.preventDefault();

  const formData = new FormData(document.getElementById('signup-form'));

  const response = await fetch('/api/users', {
    method: 'POST',
    body: formData
  });

  if(response.ok) {
    document.location = "/profile";
  } else {
    alert('Failed to create new user');
  }

  // event.preventDefault();

  // if (name && email && password && image) {
  //   const response = await fetch('/api/signup', { // Updated URL
  //     method: 'POST',
  //     body: JSON.stringify({ name, email, password }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   if (response.ok) {
  //     document.location.replace('/profile');
  //   } else {
  //     alert('Sign up failed. Please try again.');
  //   }
  // }
};

document.querySelector('#image').addEventListener('change', function (event) {
  const reader = new FileReader();
  reader.onload = function(){
    const output = document.getElementById('image-preview');
    output.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
});

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);