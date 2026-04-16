const transactions = [];

let transactionList = document.getElementById('transactionList');
let descriptionInput = document.getElementById('descriptionInput');
let amountInput = document.getElementById('amountInput');
let categoryInput = document.getElementById('category');
let expensebtn = document.getElementById('expense');
let incomebtn = document.getElementById('income');
let transactionType = 'expense';
let icon = document.createElement('div');
let deletebtn = document.createElement('h5');
deletebtn.textContent = 'X';
deletebtn.style.cursor = 'pointer';
deletebtn.style.marginLeft = '10px';
let editbtn = document.createElement('h5');
editbtn.textContent = '✏️';
editbtn.style.cursor = 'pointer';
editbtn.style.marginRight = '10px';




expensebtn.addEventListener('click', () => {
    transactionType = 'expense';
    icon.style.backgroundColor = 'red';
    icon.style.width = '8px';
    icon.style.height = '20px';
    addTransaction();
   
});

incomebtn.addEventListener('click', () => {
    transactionType = 'income';
    icon.style.backgroundColor = 'green';
    icon.style.width = '8px';
    icon.style.height = '20px';
    addTransaction();
});

function addTransaction() {
    transactionList.innerHTML = '';
    let description = descriptionInput.value;
    let amount = parseFloat(amountInput.value);
    let category = categoryInput.value;

transactions.push({
        description: description,
        amount: amount,
        category: category,
        type: transactionType
    });
    descriptionInput.value = '';
    amountInput.value = '';
    categoryInput.value = '';
    console.log(transactions);

    transactions.forEach((transaction) => {
        let item = document.createElement('li');
        let descriptionSpan = document.createElement('span');
        descriptionSpan.style.marginLeft = '10px';
        let amountSpan = document.createElement('span');
        let categorySpan = document.createElement('span');
        descriptionSpan.textContent = transaction.description;
        let sideBtn = document.createElement('span');
        sideBtn.style.display = 'flex';
        sideBtn.appendChild(editbtn);
        sideBtn.appendChild(deletebtn);
        amountSpan.textContent = transaction.amount;
        categorySpan.textContent = transaction.category;
        icon.appendChild(descriptionSpan);
        icon.style.display = "flex";
        item.appendChild(icon);
        item.appendChild(categorySpan);
         item.appendChild(amountSpan);
         item.appendChild(sideBtn);
         item.style.display = 'flex';
         item.style.justifyContent = 'space-between';
         item.style.alignItems = 'center';
         item.style.padding = '10px';
         item.style.borderBottom = '1px solid #ccc';
        // item.style.textDecoration = "none";
        transactionList.appendChild(item);
    });



}
