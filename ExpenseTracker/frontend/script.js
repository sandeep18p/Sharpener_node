const form = document.getElementById('signupForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';

  if (!name) {
    document.getElementById('nameError').textContent = 'Name is required.';
    return;
  }
  if (!email) {
    document.getElementById('emailError').textContent = 'Email is required.';
    return;
  }
  if (password.length < 6) {
    document.getElementById('passwordError').textContent = 'Password must be at least 6 characters.';
    return;
  }

  try {
    const response = await fetch('/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Signup successful!');
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
});
