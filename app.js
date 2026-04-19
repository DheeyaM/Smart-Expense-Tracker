const transactions = [];
let editingId = null;
let deleteId = null;

let transactionList = document.getElementById("transactionList");
let descriptionInput = document.getElementById("descriptionInput");
let amountInput = document.getElementById("amountInput");
let categoryInput = document.getElementById("category");
let expensebtn = document.getElementById("expense");
let incomebtn = document.getElementById("income");
let transactionType = "expense";

expensebtn.addEventListener("click", () => {
  transactionType = "expense";
  if (editingId) {
    let index = transactions.findIndex((t) => t.id === editingId);
    transactions[index].description = descriptionInput.value;
    transactions[index].amount = parseFloat(amountInput.value);
    transactions[index].category = categoryInput.value;
    editingId = null;
    populateTransactionList();
    clearInput();
  } else {
    addTransaction();
  }
});

incomebtn.addEventListener("click", () => {
  transactionType = "income";
  if (editingId) {
    let index = transactions.findIndex((t) => t.id === editingId);
    transactions[index].description = descriptionInput.value;
    transactions[index].amount = parseFloat(amountInput.value);
    transactions[index].category = categoryInput.value;
    editingId = null;
    populateTransactionList();
    clearInput();
  } else {
    addTransaction();
  }
});

function addTransaction() {
  transactionList.innerHTML = "";
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
