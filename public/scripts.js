const diceList = ["D4", "D6", "D8", "D10", "D12", "D20"];
const imagePaths = { "D4": "/public/dice.svg/icons/000000/transparent/1x1/skoll/d4.svg", "D6": "/public/dice.svg/icons/000000/transparent/1x1/delapouite/perspective-dice-six.svg", "D8": "/public/dice.svg/icons/000000/transparent/1x1/delapouite/dice-eight-faces-eight.svg", "D10": "/public/dice.svg/icons/000000/transparent/1x1/skoll/d10.svg", "D12": "/public/dice.svg/icons/000000/transparent/1x1/skoll/d12.svg", "D20": "/public/dice.svg/icons/000000/transparent/1x1/delapouite/dice-twenty-faces-twenty.svg" };
let selectedDiceIndex = 0;
let selectedDice = [];
let rolls = [];

const diceElement = document.getElementById("dice");
const selectedDiceElement = document.getElementById("dice-selection");
const rollResultElement = document.getElementById("roll-list");

function updateDiceDisplay() {
    diceElement.innerHTML = `<img src="${imagePaths[diceList[selectedDiceIndex]]}" alt="${diceList[selectedDiceIndex]}" style="width: 50px; height: 50px;">`;
}

function updateSelectedDiceDisplay() {
    selectedDiceElement.innerHTML = "";
    selectedDice.forEach(dice => {
        const img = document.createElement("img");
        img.src = imagePaths[dice];
        img.alt = dice;
        img.style.width = "100px";
        img.style.height = "100px";
        selectedDiceElement.appendChild(img);
    });
}

function rollDice() {
    if (selectedDice.length === 0) {
        alert("Please add dice to roll.");
        return;
    }

    // Add rolling animation to each selected dice
    const diceImages = selectedDiceElement.querySelectorAll("img");
    diceImages.forEach(img => img.classList.add("rolling"));

    setTimeout(() => {
        diceImages.forEach(img => img.classList.remove("rolling"));

        rolls = [];
        selectedDice.forEach(diceType => {
            const rollResult = Math.floor(Math.random() * parseInt(diceType.slice(1)) + 1);
            rolls.push(rollResult);
        });
        displayRollResults();
    }, 1000); // Match the duration of the animation
}

function displayRollResults() {
    rollResultElement.textContent = "Roll Results:";

    rolls.forEach((roll, index) => {
        let li = document.createElement('li');
        li.innerHTML = `<img src="${imagePaths[selectedDice[index]]}" alt="${selectedDice[index]}" style="width: 50px; height: 50px;"> ${selectedDice[index]}: ${roll}`;
        rollResultElement.appendChild(li);
    });

    const totalSum = rolls.reduce((acc, curr) => acc + curr, 0);
    let liSum = document.createElement('li');
    liSum.textContent = `Total Sum: ${totalSum}`;
    rollResultElement.appendChild(liSum);
}

document.getElementById("add-dice").addEventListener("click", function () {
    if (selectedDice.length < 20) {  // Set the maximum limit to 20 dice
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

// Initial display update
updateDiceDisplay();