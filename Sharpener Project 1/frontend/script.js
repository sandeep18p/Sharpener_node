const unameInput = document.getElementById('uname');
const phnoInput = document.getElementById('phno');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('sub');
const form = document.getElementById('myForm');
const divTwo = document.getElementById('two');
let editingUserId = null;  // Store the ID of the user being edited

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted!");

  const userData = {
    uname: unameInput.value,
    phno: phnoInput.value,
    email: emailInput.value
  };

  if (editingUserId) {
    // If editing, make PUT request to update the user
    axios.put(`http://localhost:3000/create/${editingUserId}`, userData)
      .then(response => {
        console.log("User updated:", response.data);
        fetchUsers();  // Refresh the user list
        resetForm();
      })
      .catch(error => {
        console.error("Error updating user:", error);
      });
  } else {
    // If creating, make POST request to create the user
    axios.post('http://localhost:3000/create', userData)
      .then(response => {
        console.log("User created:", response.data);
        fetchUsers();  // Refresh the user list
        resetForm();
      })
      .catch(error => {
        console.error("Error creating user:", error);
      });
  }
});

function fetchUsers() {
  axios.get('http://localhost:3000/create')
    .then(response => {
      console.log("Users fetched:", response.data);
      divTwo.innerHTML = '';  // Clear divTwo before appending new data

      response.data.users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
          <p>Username: ${user.username}</p>
          <p>Phone Number: ${user.phone_number}</p>
          <p>Email: ${user.email}</p>
          <button onclick="editUser(${user.id})">Edit</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        `;
        divTwo.appendChild(userDiv);
      });
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
}

function editUser(id) {
  // Find the user by ID and populate the form
  axios.get(`http://localhost:3000/create/${id}`)
    .then(response => {
      const user = response.data.user;
      unameInput.value = user.username;
      phnoInput.value = user.phone_number;
      emailInput.value = user.email;
      submitButton.textContent = "Update";  // Change submit button text to "Update"
      editingUserId = user.id;  // Store the ID of the user being edited
    })
    .catch(error => {
      console.error("Error fetching user for editing:", error);
    });
}

function deleteUser(id) {
  // Send DELETE request to remove the user
  axios.delete(`http://localhost:3000/create/${id}`)
    .then(response => {
      console.log("User deleted:", response.data);
      fetchUsers();  // Refresh the user list
    })
    .catch(error => {
      console.error("Error deleting user:", error);
    });
}

function resetForm() {
  // Reset form and button text
  unameInput.value = '';
  phnoInput.value = '';
  emailInput.value = '';
  submitButton.textContent = "Submit";
  editingUserId = null;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();  // Fetch users on page load
});
