const incomesForm = document.getElementById("incomes-form");
const incomesList = document.getElementById("incomes-list");

const incomes = [];

function renderIncomesList() {
  incomesList.innerHTML = "";
  incomes.forEach((income) => {
    const item = document.createElement("li");
    item.textContent = `${income.title}: ${income.amount} zł`;
    incomesList.appendChild(item);
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

  renderIncomesList();
});
