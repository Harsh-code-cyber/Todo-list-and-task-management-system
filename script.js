
function addTask() {

    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    input.value = "";
}
