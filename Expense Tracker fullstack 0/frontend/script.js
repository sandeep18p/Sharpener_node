let editExpenseId = null;

document.addEventListener('DOMContentLoaded', fetchExpenses);

const form = document.getElementById('formone');
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const expenseData = {
    amount: document.getElementById('expenseAmount').value,
    name: document.getElementById('expenseName').value,
    category: document.getElementById('expenseCategory').value,
  };

  if (editExpenseId) {
    
    axios.put(`http://localhost:3000/expenses/${editExpenseId}`, expenseData)
      .then(response => {
        console.log("Expense updated:", response.data);
        fetchExpenses(); 
        resetForm();
      })
      .catch(error => {
        console.error("Error updating expense:", error);
      });
  } else {
    // Create a new expense
    axios.post('http://localhost:3000/expenses', expenseData)
      .then(response => {
        console.log("Expense created:", response.data);
        fetchExpenses(); // Refresh the expense list
        resetForm();
      })
      .catch(error => {
        console.error("Error creating expense:", error);
      });
  }
});

function fetchExpenses() {
  axios.get('http://localhost:3000/expenses')
    .then(response => {
      console.log("Expenses fetched:", response.data);
      const list = document.getElementById('toShow');
      list.innerHTML = ''; // Clear the existing list

      response.data.expenses.forEach(expense => {
        const expenseItem = document.createElement('li');
        expenseItem.innerHTML = `
          Amount: ${expense.amount}, Name: ${expense.name}, Category: ${expense.category}
          <span class="cp">
            <button onclick="editExpense(${expense.id})" class="op">Edit</button>
            <button onclick="deleteExpense(${expense.id})" class="op">Delete</button>
          </span>
        `;
        list.appendChild(expenseItem);
      });
    })
    .catch(error => {
      console.error("Error fetching expenses:", error);
    });
}

function editExpense(id) {
  axios.get(`http://localhost:3000/expenses/${id}`)
    .then(response => {
      const expense = response.data.expense;
      document.getElementById('expenseAmount').value = expense.amount;
      document.getElementById('expenseName').value = expense.name;
      document.getElementById('expenseCategory').value = expense.category;

      editExpenseId = expense.id; // Store the ID of the expense being edited
      document.getElementById('submitButton').textContent = 'Update';
    })
    .catch(error => {
      console.error("Error fetching expense for editing:", error);
    });
}

function deleteExpense(id) {
  axios.delete(`http://localhost:3000/expenses/${id}`)
    .then(response => {
      console.log("Expense deleted:", response.data);
      fetchExpenses(); // Refresh the expense list
    })
    .catch(error => {
      console.error("Error deleting expense:", error);
    });
}

function resetForm() {
  document.getElementById('formone').reset();
  document.getElementById('submitButton').textContent = 'Submit';
  editExpenseId = null;
}
