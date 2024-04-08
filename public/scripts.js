const diceList = ["D4", "D6", "D8", "D10", "D12", "D20"];
let selectedDiceIndex = 0;
let selectedDice = [];
let rolls = [];

const diceElement = document.getElementById("dice");
const selectedDiceElement = document.getElementById("dice-selection");
const rollResultElement = document.getElementById("roll-list");

function updateDiceDisplay() {
    diceElement.textContent = diceList[selectedDiceIndex];
}

function updateSelectedDiceDisplay() {
    selectedDiceElement.innerHTML = "";
    selectedDice.forEach(dice => {
        const a = document.createElement("a");
        a.classList="nes-badge";
        const span = document.createElement("span");
        span.classList="is-warning";
        span.textContent = dice;
        a.appendChild(span);
        selectedDiceElement.appendChild(a);
    });
}

function rollDice() {
    if (selectedDice.length === 0) {
        alert("Please add dice to roll.");
        return;
    }

    rolls = [];
    selectedDice.forEach(diceType => {
        const rollResult = Math.floor(Math.random() * parseInt(diceType.slice(1)) + 1);
        rolls.push(rollResult);
    });
    displayRollResults();
}

function displayRollResults() {
    rollResultElement.textContent = "Roll Results:";
    
    rolls.forEach((roll, index) => {
        var li=document.createElement('li');
        li.textContent = `${selectedDice[index]}: ${roll}`;
        rollResultElement.appendChild(li);
        if (index !== rolls.length - 1) {
            var li=document.createElement('li');

        }
    });
    const totalSum = rolls.reduce((acc, curr) => acc + curr, 0);
    var liSum=document.createElement('li');
    liSum.textContent = `Total Sum: ${totalSum}`;
    rollResultElement.appendChild(liSum);

}

document.getElementById("add-dice").addEventListener("click", function () {
    if (selectedDice.length < diceList.length) {
        selectedDice.push(diceList[selectedDiceIndex]);
        updateSelectedDiceDisplay();
    }
});

document.getElementById("remove-dice").addEventListener("click", function () {
    if (selectedDice.length > 0) {
        selectedDice.pop();
        updateSelectedDiceDisplay();
    }
});

document.getElementById("clear-dice").addEventListener("click", function () {
    selectedDice = [];
    rollResultElement.textContent = "";
    updateSelectedDiceDisplay();
});

document.getElementById("roll-dice").addEventListener("click", function () {
    rollDice();
});

document.getElementById("prev-dice").addEventListener("click", function () {
    if (selectedDiceIndex > 0) {
        selectedDiceIndex--;
        updateDiceDisplay();
        updateSelectedDiceDisplay();
    }
});

document.getElementById("next-dice").addEventListener("click", function () {
    if (selectedDiceIndex < diceList.length - 1) {
        selectedDiceIndex++;
        updateDiceDisplay();
        updateSelectedDiceDisplay();
    }
});