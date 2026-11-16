function addTask(status = "in-progress") {

    const input = document.querySelector(".input-section input");
    const description = input.value.trim();
    const card = document.createElement("div");
    card.classList.add("task-card");


    const taskText = document.createElement("div");
    taskText.classList.add("task-description");
    taskText.textContent = description;

    // edit, delete buttons;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    taskText.appendChild(buttonContainer);

    const EditButton = document.createElement("button");
    EditButton.classList.add("edit-button");
    EditButton.textContent = "Edit";
    EditButton.addEventListener("click", () => {});
    buttonContainer.appendChild(EditButton);

    const DeleteButton = document.createElement("button");
    DeleteButton.classList.add("delete-button");
    DeleteButton.textContent = "Delete";
    DeleteButton.addEventListener("click", () => {});
    buttonContainer.appendChild(DeleteButton);




    // add status indicator
    const taskStatus = document.createElement("div");
    taskStatus.classList.add("task-status");

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

    taskStatus.classList.add(
        statusClasses[status] || statusClasses["in-progress"]
    );

    taskStatus.textContent =
        statusLabels[status] || statusLabels["in-progress"];

    card.append(taskText, taskStatus);

    document.querySelector("#task-list").appendChild(card);

    input.value = "";
}