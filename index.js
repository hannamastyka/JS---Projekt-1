const incomesForm = document.getElementById("incomes-form");
const incomesList = document.getElementById("incomes-list");
const totalIncomes = document.getElementById("total-incomes");
const balanceElement = document.getElementById("balance");
const expensesForm = document.getElementById("expenses-form");
const expensesList = document.getElementById("expenses-list");
const totalExpenses = document.getElementById("total-expenses");

const incomes = [];
const expenses = [];

function updateBalanceUI() {
  const incomesSum = incomes.reduce((a, b) => a + Number(b?.amount), 0);
  const expensesSum = expenses.reduce((a, b) => a + Number(b?.amount), 0);
  const balance = incomesSum - expensesSum;

  if (balance > 0) {
    balanceElement.textContent = `Możesz jeszcze wydać ${balance.toFixed(
      2
    )} złotych`;
  } else if (balance === 0) {
    balanceElement.textContent = "Bilans wynosi zero";
  } else {
    balanceElement.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      balance
    ).toFixed(2)} złotych`;
  }
}
function calculateTotalIncomes() {
  const sum = incomes.reduce((a, b) => a + Number(b?.amount), 0);
  totalIncomes.textContent = `Suma przychodów: ${sum} zł`;
}

function renderIncomesList() {
  incomesList.innerHTML = "";
  incomes.forEach((income) => {
    const item = document.createElement("li");
    item.textContent = `${income.title}: ${income.amount} zł`;
    const editButton = document.createElement("button");
    editButton.textContent = "edytuj";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "usuń";
    incomesList.appendChild(item);
    item.appendChild(deleteButton);
    item.appendChild(editButton);
    deleteButton.addEventListener("click", () => {
      const index = incomes.findIndex((item) => item.id === income.id);
      incomes.splice(index, 1);
      calculateTotalIncomes();
      updateBalanceUI();
      renderIncomesList();
    });
    editButton.addEventListener("click", () => {
      const editModal = document.getElementById("edit-modal");
      editModal.classList.remove("hidden");
      const editTitle = document.getElementById("editTitle");
      const editAmount = document.getElementById("editAmount");
      editTitle.value = income.title;
      editAmount.value = income.amount;
      const editForm = document.getElementById("editForm");
      const handleEdit = (event) => {
        event.preventDefault();
        editModal.classList.add("hidden");
        const itemToEdit = incomes.find((item) => item.id === income.id);
        itemToEdit.title = editTitle.value;
        itemToEdit.amount = editAmount.value;
        calculateTotalIncomes();
        updateBalanceUI();
        renderIncomesList();

        editForm.removeEventListener("submit", handleEdit);
      };

      editForm.addEventListener("submit", handleEdit);
      const cancelButton = document.getElementById("cancelButton");
      cancelButton.addEventListener("click", () => {
        editModal.classList.add("hidden");
      });
    });
  });
}

incomesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = event.target.incomeTitle.value;
  const amount = event.target.incomeAmount.value;

  incomes.push({
    title,
    amount,
    id: Math.random(),
  });
  event.target.incomeTitle.value = "";
  event.target.incomeAmount.value = "";

  renderIncomesList();
  calculateTotalIncomes();
  updateBalanceUI();
});

updateBalanceUI();

function calculateTotalExpenses() {
  const sum = expenses.reduce((a, b) => a + Number(b?.amount), 0);
  totalExpenses.textContent = `Suma wydatków: ${sum} zł`;
}

function renderExpensesList() {
  expensesList.innerHTML = "";
  expenses.forEach((expense) => {
    const item = document.createElement("li");
    item.textContent = `${expense.title}: ${expense.amount} zł`;
    const editButton = document.createElement("button");
    editButton.textContent = "edytuj";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "usuń";
    expensesList.appendChild(item);
    item.appendChild(deleteButton);
    item.appendChild(editButton);
    deleteButton.addEventListener("click", () => {
      const index = expenses.findIndex((item) => item.id === expense.id);
      expenses.splice(index, 1);
      calculateTotalExpenses();
      updateBalanceUI();
      renderExpensesList();
    });

    editButton.addEventListener("click", () => {
      const editModal = document.getElementById("edit-modal");
      editModal.classList.remove("hidden");
      const editTitle = document.getElementById("editTitle");
      const editAmount = document.getElementById("editAmount");
      editTitle.value = expense.title;
      editAmount.value = expense.amount;
      const editForm = document.getElementById("editForm");
      const handleEdit = (event) => {
        event.preventDefault();
        editModal.classList.add("hidden");
        const itemToEdit = expenses.find((item) => item.id === expense.id);
        itemToEdit.title = editTitle.value;
        itemToEdit.amount = editAmount.value;
        calculateTotalExpenses();
        updateBalanceUI();
        renderExpensesList();

        editForm.removeEventListener("submit", handleEdit);
      };

      editForm.addEventListener("submit", handleEdit);
      const cancelButton = document.getElementById("cancelButton");
      cancelButton.addEventListener("click", () => {
        editModal.classList.add("hidden");
      });
    });
  });
}

expensesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = event.target.expenseTitle.value;
  const amount = event.target.expenseAmount.value;

  expenses.push({
    title,
    amount,
    id: Math.random(),
  });
  event.target.expenseTitle.value = "";
  event.target.expenseAmount.value = "";

  renderExpensesList();
  calculateTotalExpenses();
  updateBalanceUI();
});

