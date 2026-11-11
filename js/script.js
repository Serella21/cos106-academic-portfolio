
// ACADEMIC PLANNER
// ======================================

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Get saved tasks from the browser
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];
} catch (error) {
    tasks = [];
}

// Save tasks
function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    if (!taskList) return;

    taskList.innerHTML = "";

    if (emptyMessage) {
        emptyMessage.style.display =
            tasks.length === 0 ? "block" : "none";
    }

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const label = document.createElement("label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.name;

        label.appendChild(checkbox);
        label.appendChild(span);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(label);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });
}

// Add a new task
if (taskForm) {

    taskForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const taskName = taskInput.value.trim();

        if (taskName !== "") {

            tasks.push({
                name: taskName,
                completed: false
            });

            saveTasks();
            displayTasks();

            taskInput.value = "";
        }

    });

}

// Load saved tasks
displayTasks();



// CONTACT FORM VALIDATION
// ======================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !phone || !subject || !message) {

            formMessage.textContent = "Please complete all fields.";
            return;

        }

        formMessage.textContent =
            "Thank you, " + name +
            "! Your form has been submitted successfully.";

        contactForm.reset();

    });

}
