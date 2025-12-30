const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

// 1. Load data from LocalStorage or start with empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateUI() {
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        total += parseFloat(expense.amount);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.category}</td>
            <td>$${expense.amount}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseList.appendChild(row);
    });

    totalAmount.innerText = total.toFixed(2);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// 2. Add Expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;

    expenses.push({ name, amount, category });
    updateUI();
    expenseForm.reset();
});

// 3. Delete Expense
window.deleteExpense = (index) => {
    expenses.splice(index, 1);
    updateUI();
};

// Initialize
updateUI();