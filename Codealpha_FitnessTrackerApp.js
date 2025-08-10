// Load existing logs from localStorage
let logs = JSON.parse(localStorage.getItem("fitnessLogs")) || [];

// DOM Elements
const dateInput = document.getElementById("date");
const stepsInput = document.getElementById("steps");
const exerciseInput = document.getElementById("exercise");
const caloriesInput = document.getElementById("calories");
const addLogBtn = document.getElementById("add-log");
const totalStepsEl = document.getElementById("total-steps");
const totalCaloriesEl = document.getElementById("total-calories");
const stepsProgress = document.getElementById("steps-progress");
const activityList = document.getElementById("activity-list");

// Add Log
addLogBtn.addEventListener("click", () => {
    const log = {
        date: dateInput.value || new Date().toISOString().split("T")[0],
        steps: parseInt(stepsInput.value) || 0,
        exercise: exerciseInput.value || "N/A",
        calories: parseInt(caloriesInput.value) || 0
    };

    logs.push(log);
    localStorage.setItem("fitnessLogs", JSON.stringify(logs));
    clearInputs();
    updateDashboard();
});

// Clear input fields
function clearInputs() {
    stepsInput.value = "";
    exerciseInput.value = "";
    caloriesInput.value = "";
}

// Update Dashboard
function updateDashboard() {
    let today = new Date().toISOString().split("T")[0];
    let totalSteps = 0;
    let totalCalories = 0;
    activityList.innerHTML = "";

    logs.forEach(log => {
        if (log.date === today) {
            totalSteps += log.steps;
        }

        // Weekly calories (last 7 days)
        let logDate = new Date(log.date);
        let diffDays = (new Date() - logDate) / (1000 * 60 * 60 * 24);
        if (diffDays <= 7) {
            totalCalories += log.calories;
        }

        let li = document.createElement("li");
        li.textContent = `${log.date} - ${log.exercise} (${log.steps} steps, ${log.calories} cal)`;
        activityList.appendChild(li);
    });

    totalStepsEl.textContent = totalSteps;
    totalCaloriesEl.textContent = totalCalories;
    stepsProgress.style.width = `${Math.min((totalSteps / 10000) * 100, 100)}%`; // Goal: 10k steps
}

// Initial load
updateDashboard();
