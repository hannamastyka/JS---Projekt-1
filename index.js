const incomesForm = document.getElementById("incomes-form");
const incomesList = document.getElementById("incomes-list");
const totalIncomes = document.getElementById("total-incomes");
const balanceElement = document.getElementById("balance");

const incomes = [];
const expenses = [];

function updateBalanceUI() {
  const incomesSum = incomes
    .map((income) => Number(income.amount))
    .reduce((a, b) => a + b, 0);
  const expensesSum = expenses
    .map((expense) => Number(expense.amount))
    .reduce((a, b) => a + b, 0);
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
  const amounts = incomes.map((income) => Number(income.amount));
  const sum = amounts.reduce((a, b) => a + b, 0);
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
      const cancelButton = document.getElementById("cancelButton");
      editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        editModal.classList.add("hidden");
        const itemToEdit = incomes.find((item) => item.id === income.id);
        itemToEdit.title = editTitle.value;
        itemToEdit.amount = editAmount.value;
        calculateTotalIncomes();
        updateBalanceUI();
        renderIncomesList();
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
});

updateBalanceUI();
