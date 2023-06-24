 const transactionForm = document.getElementById('transactionForm');
 const transactionBody = document.getElementById('transaction-body');
 const balanceElement = document.getElementById('balance');
 
 // Retrieve balance from local storage or initialize it to 0
 let balance = localStorage.getItem('balance');
 balance = balance ? parseFloat(balance) : 0;
 
 let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
 
 let type = localStorage.getItem('tpye') || 'income';
 let amount = localStorage.getItem('amount') || '';
 // Store the updated balance in local storage
 localStorage.setItem('balance', balance);
 localStorage.setItem('transactions', JSON.stringify(transactions));
 localStorage.setItem('type', type);
 localStorage.setItem('amount', amount);
 
 
 
 // Add transaction event listener
 transactionForm.addEventListener('submit', (e) => {
     e.preventDefault();
 
     // Get transaction details from the form
     const type = document.getElementById('type').value;
     const amount = parseFloat(document.getElementById('amount').value);
     const description = document.getElementById('description').value;
 
     // Create a new transaction object
     const transaction = {
         type,
         amount,
         description
     };
 
     // Add transaction to the transactions array
     transactions.push(transaction);
 
     // Update the balance
     if (type === 'income') {
         balance += amount;
     } else if (type === 'expense') {
         balance -= amount;
     }
 
     
     // Clear the form inputs
     document.getElementById('amount').value = '';
     document.getElementById('description').value = '';
 
     // Render the transactions and balance
     renderTransactions();
     renderBalance();
 });
 
 
// Delete or Edit transaction event listener
transactionBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const transactionIndex = e.target.parentNode.parentNode.rowIndex - 1;

        // Update the balance
        if (transactions[transactionIndex].type === 'income') {
            balance -= transactions[transactionIndex].amount;
        } else if (transactions[transactionIndex].type === 'expense') {
            balance += transactions[transactionIndex].amount;
        }

        // Remove transaction from the transactions array
        transactions.splice(transactionIndex, 1);

        // Render the transactions and balance
        renderTransactions();
        renderBalance();
    } 
});

// Edit transaction event listener
transactionBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const transactionIndex = e.target.parentNode.parentNode.rowIndex - 1;
        const transaction = transactions[transactionIndex];
    
        // Pre-fill the form inputs with the transaction details
        document.getElementById('type').value = transaction.type;
        document.getElementById('amount').value = transaction.amount;
        document.getElementById('description').value = transaction.description;
    
        // Remove the transaction from the transactions array
        transactions.splice(transactionIndex, 1);
    
        // Update the balance
        if (transaction.type === 'income') {
            balance -= transaction.amount;
        } else if (transaction.type === 'expense') {
            balance += transaction.amount;
        }
    
        // Render the transactions and balance
        renderTransactions();
        renderBalance();
    }
});

 // Render the transactions
 function renderTransactions() {
     transactionBody.innerHTML = '';
 
     transactions.forEach((transaction, index) => {
         const row = document.createElement('tr');
         row.innerHTML = `
             <td>${transaction.type}</td>
             <td>${transaction.amount}</td>
             <td>${transaction.description}</td>
             <td><button class="delete-btn">Delete</button></td>
             <td><button class="edit-btn">Edit</button></td>
         `;
 
         transactionBody.appendChild(row);
     });
 }
 
 // Render the balance
 function renderBalance() {
     balanceElement.textContent = `$${balance.toFixed(2)}`;
 }
 
 // Initial rendering on page load
 renderTransactions();
 renderBalance();