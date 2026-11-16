
const taskList = document.querySelector("#task-list");

const statusClasses = {
    "in-progress": "status-in-progress",
    "partial-done": "status-partial-done",
    "completed": "status-completed"
};

const statusLabels = {
    "in-progress": "● IN-PROGRESS",
    "partial-done": "● PARTIAL DONE",
    "completed": "● COMPLETED"
};

// Create a new task
function addTask(status = "in-progress") {
    const input = document.querySelector(".input-section input");
    const description = input.value.trim();

    if (!description) return;

    const card = document.createElement("div");
    card.classList.add("task-card");

    // Description section
    const taskDescription = document.createElement("div");
    taskDescription.classList.add("task-description");

    // Actual text (separate from buttons)
    const taskText = document.createElement("div");
    taskText.classList.add("taskText");
    taskText.textContent = description;

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.type = "button";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.type = "button";

    buttonContainer.append(editButton, deleteButton);
    taskDescription.append(taskText, buttonContainer);

    // Status section
    const taskStatus = document.createElement("div");
    taskStatus.classList.add("task-status");

    const validStatus = statusClasses[status]
        ? status
        : "in-progress";

    taskStatus.classList.add(statusClasses[validStatus]);
    taskStatus.textContent = statusLabels[validStatus];

    card.append(taskDescription, taskStatus);
    taskList.appendChild(card);

    input.value = "";
}


// Handle Edit, Save, Cancel and Delete
taskList.addEventListener("click", function (event) {
    const card = event.target.closest(".task-card");

    if (!card) return;

    const editBtn = event.target.closest(".edit-btn");
    const cancelBtn = event.target.closest(".cancel-btn");
    const deleteBtn = event.target.closest(".delete-btn");

    const taskText = card.querySelector(".taskText");
    const statusDiv = card.querySelector(".task-status");

    // EDIT or SAVE
    if (editBtn) {

        // Enter edit mode
        if (editBtn.textContent.trim() === "Edit") {

            // Store original values for Cancel
            card.dataset.originalText = taskText.textContent;

            card.dataset.originalStatus =
                Object.keys(statusClasses).find(status =>
                    statusDiv.classList.contains(
                        statusClasses[status]
                    )
                ) || "in-progress";

            // Enable direct text editing
            taskText.contentEditable = "true";
            taskText.focus();

            // Create status dropdown
            const select = document.createElement("select");
            select.classList.add("status-select");

            Object.entries(statusLabels).forEach(([value, label]) => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = label.replace("● ", "");
                select.appendChild(option);
            });

            select.value = card.dataset.originalStatus;
            statusDiv.replaceChildren(select);

            // Change Edit to Save
            editBtn.textContent = "Save";
            editBtn.classList.add("save-btn");

            // Change Delete to Cancel
            const cancelbtn = card.querySelector(".delete-btn");
            cancelbtn.textContent = "Cancel";
            cancelbtn.classList.replace("delete-btn", "cancel-btn");

            return;
        }

        // Save changes
        const select = statusDiv.querySelector(".status-select");
        const newText = taskText.textContent.trim();

        if (!newText) {
            taskText.focus();
            return;
        }

        const newStatus = select.value;

        // Finish text editing
        taskText.textContent = newText;
        taskText.contentEditable = "false";

        // Restore status appearance with the new value
        statusDiv.classList.remove(
            ...Object.values(statusClasses)
        );

        statusDiv.classList.add(statusClasses[newStatus]);
        statusDiv.textContent = statusLabels[newStatus];

        // Restore buttons
        editBtn.textContent = "Edit";
        editBtn.classList.remove("save-btn");

        const btn = card.querySelector(".cancel-btn");
        btn.textContent = "Delete";
        btn.classList.replace("cancel-btn", "delete-btn");

        return;
    }

    // CANCEL editing and restore original values
    if (cancelBtn) {
        taskText.textContent = card.dataset.originalText;
        taskText.contentEditable = "false";

        const originalStatus =
            card.dataset.originalStatus || "in-progress";

        statusDiv.classList.remove(
            ...Object.values(statusClasses)
        );

        statusDiv.classList.add(statusClasses[originalStatus]);
        statusDiv.textContent = statusLabels[originalStatus];

        const Editbtn = card.querySelector(".save-btn");
        Editbtn.textContent = "Edit";
        Editbtn.classList.replace("save-btn", "edit-btn");

        cancelBtn.textContent = "Delete";
        cancelBtn.classList.replace("cancel-btn", "delete-btn");

        return;
    }

    // DELETE task
    if (deleteBtn) {
        card.remove();
    }
});
