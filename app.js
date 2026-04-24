const transactions = [];
let editingId = null;

let transactionList = document.getElementById("transactionList");
let descriptionInput = document.getElementById("descriptionInput");
let amountInput = document.getElementById("amountInput");
let categoryInput = document.getElementById("category");
let expensebtn = document.getElementById("expense");
let incomebtn = document.getElementById("income");
let transactionType = "expense";
let food = 0;
let transport = 0;
let entertainment = 0;
let savings = 0;
let others = 0;
let personal = 0;
let chart = document.getElementById("myChart");

expensebtn.addEventListener("click", () => {
  if (editingId) {
    edit();
    populateTransactionList();
    clearInput();
    updateBalance();
    updateCards();
  } else {
    transactionType = "expense";
    addTransaction();
  }
});

incomebtn.addEventListener("click", () => {
  if (editingId) {
    edit();
    populateTransactionList();
    clearInput();
    updateBalance();
    updateCards();
  } else {
    transactionType = "income";
    addTransaction();
  }
});

function addTransaction() {
  let description = descriptionInput.value;
  let amount = parseFloat(amountInput.value);
  let category = categoryInput.value;

  transactions.push({
    id: Date.now().toString(),
    description: description,
    amount: amount,
    category: category,
    type: transactionType,
  });
  clearInput();
  console.log(transactions);
  populateTransactionList();
  updateBalance();
  updateCards();
}

//populate the transaction list
function populateTransactionList() {
  transactionList.innerHTML = "";
  transactions.forEach((transaction) => {
    let item = document.createElement("li");
    let editbtn = document.createElement("h5");
    let deletebtn = document.createElement("h5");
    item.dataset.id = transaction.id;
    deletebtn.textContent = "X";
    deletebtn.style.cursor = "pointer";
    deletebtn.style.marginLeft = "10px";
    editbtn.textContent = "✏️";
    editbtn.style.cursor = "pointer";
    editbtn.style.marginRight = "10px";

    let descriptionSpan = document.createElement("span");
    descriptionSpan.style.marginLeft = "10px";
    let amountSpan = document.createElement("span");
    let categorySpan = document.createElement("span");
    descriptionSpan.textContent = transaction.description;
    let icon = document.createElement("div");
    icon.style.width = "8px";
    icon.style.height = "20px";
    if (transaction.type === "expense") {
      icon.style.backgroundColor = "red";
    } else {
      icon.style.backgroundColor = "green";
    }
    let sideBtn = document.createElement("span");
    sideBtn.style.display = "flex";
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
    item.style.display = "flex";
    item.style.justifyContent = "space-between";
    item.style.alignItems = "center";
    item.style.padding = "10px";
    item.style.borderBottom = "1px solid #ccc";
    // item.style.textDecoration = "none";
    transactionList.appendChild(item);

    editbtn.addEventListener("click", (e) => {
      let id = e.target.parentElement.parentElement.dataset.id;
      let transaction = transactions.find((t) => t.id === id);
      descriptionInput.value = transaction.description;
      amountInput.value = transaction.amount;
      categoryInput.value = transaction.category;
      editingId = id;
    });

    deletebtn.addEventListener("click", (e) => {
      let id = e.target.parentElement.parentElement.dataset.id;
      if (confirm("Are you sure you want to delete this transaction?")) {
      let transaction = transactions.findIndex((t) => t.id === id);
      transactions.splice(transaction, 1);
      populateTransactionList();
        updateBalance();
        updateCards();
      }
    });
  });
}

// Call the function to populate the transaction list
populateTransactionList();

function clearInput() {
  descriptionInput.value = "";
  amountInput.value = "";
  categoryInput.value = "";
}

function edit(){
  let index = transactions.findIndex((t) => t.id === editingId);
    transactions[index].description = descriptionInput.value;
    transactions[index].amount = parseFloat(amountInput.value);
    transactions[index].category = categoryInput.value;
    editingId = null;
}

function updateBalance() {
let balance = 0;
let income = 0;
let expense = 0;
let balanceValue = document.getElementById("balanceValue");
let incomeValue = document.getElementById("incomeValue");
let expenseValue = document.getElementById("expenseValue");

transactions.forEach((transaction) => {
  if (transaction.type === "income") {
    income += transaction.amount;
   
  } else {
     expense += parseInt(transaction.amount);
   
  }
  balance = income - expense;
 
});
 balanceValue.textContent = `Balance: R${parseInt(balance)}`;
incomeValue.textContent = `Income: R${parseInt(income)}`;
expenseValue.textContent = `Expense: R${parseInt(expense)}`;
}

const myChart = new Chart(chart, {
  type: 'doughnut',
  data: {
    labels: ['Food', 'Transport', 'Entertainment', 'Savings', 'Others', 'Personal'],
    datasets: [{
      label: 'Expense Distribution',
      data: [food, transport, entertainment, savings, others, personal],
      borderWidth: 1,
    }]
  },
  options: {  
  
        beginAtZero: true
      }
    }
    
  
);


function updateCards() {
food = 0;
transport = 0;
entertainment = 0;
savings = 0;
others = 0;
personal = 0;
let foodValue = document.getElementById("foodbtn");
let transportValue = document.getElementById("transportbtn");
let entertainmentValue = document.getElementById("entertainmentbtn");
let savingsValue = document.getElementById("savingsbtn");
let othersValue = document.getElementById("otherbtn");
let personalValue = document.getElementById("personalbtn");
transactions.forEach((transaction) => {
  if (transaction.category === "Food") {
   if (transaction.type === "income") {
        food += transaction.amount;
    } else {
        food -= transaction.amount;
    }
    foodValue.textContent = `Food: R${parseInt(food)}`;
  } else if (transaction.category === "Transport") {
     if (transaction.type === "income") {
        transport += transaction.amount;
    } else {
        transport -= transaction.amount;
    }
   
  } else if (transaction.category === "Entertainment") {
     if (transaction.type === "income") {
        entertainment += transaction.amount;
    } else {
        entertainment -= transaction.amount;
    }
     
  } else if (transaction.category === "Savings") {
     if (transaction.type === "income") {
        savings += transaction.amount;
    } else {
        savings -= transaction.amount;
    }
   
  } else if (transaction.category === "Others") {
     if (transaction.type === "income") {
        others += transaction.amount;
    } else {
        others -= transaction.amount;
    }
   

  } else if (transaction.category === "Personal") {
     if (transaction.type === "income") {
        personal += transaction.amount;
    } else {
        personal -= transaction.amount;
    }
   
  }
});
transportValue.textContent = `Transport: R${parseInt(transport)}`;
entertainmentValue.textContent = `Entertainment: R${parseInt(entertainment)}`;
savingsValue.textContent = `Savings: R${parseInt(savings)}`;
othersValue.textContent = `Others: R${parseInt(others)}`;
personalValue.textContent = `Personal: R${parseInt(personal)}`;
foodValue.textContent = `Food: R${parseInt(food)}`;
myChart.data.datasets[0].data = [food, transport, entertainment, savings, others, personal];
myChart.update();
}

