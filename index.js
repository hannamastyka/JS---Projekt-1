const incomesForm = document.getElementById("incomes-form");
const incomesList = document.getElementById("incomes-list");
const totalIncomes = document.getElementById("total-incomes");

const incomes = [];

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
    // dodac buttony
    incomesList.appendChild(item);
  });
  calculateTotalIncomes();
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

  renderIncomesList();
});
function updateBalanceUI(balance) {
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

updateUI();
