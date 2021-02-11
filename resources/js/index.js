import { TaskManager } from './taskManager.js';

// creates a new instance of the TaskManager class
const manager = new TaskManager();

// STEP 1 (on page load) --> loads all of the cards stored in the browser's local storage
manager.load();
// STEP 1 (on page load) --> renders all of the cards brought in from local storage
manager.render();

/* (STEP 2) An empty error string is created at the top of the validate form function. If any of the input fields are left empty when the
submit button is clicked, the appropriate error is concatenated to the error string. If the error string is true, it appears above the
submission form. If all of the input fields have valid inputs, the inputs are passed into the addTask method and stored in the this.tasks array. After this.tasks is updated, it is rendered to the page again and updated in local storage. Once the all changes have been made, all of the input fields are cleared. This function is the event handler of the submit button. */
const validFormFieldInput = () => {

    let errorString = '';

    const newTaskNameInput = document.getElementById('task-name');
    const taskName = newTaskNameInput.value;

    const newTaskDescriptionInput = document.getElementById('task-description');
    const taskDescription = newTaskDescriptionInput.value;

    const newAssignedToInput = document.getElementById('assigned-to');
    const assignedTo = newAssignedToInput.value;

    const newDueDateInput = document.getElementById('due-date');
    const dueDate = newDueDateInput.value;

    const newTaskStatusInput = document.getElementById('task-status');
    const taskStatus = newTaskStatusInput.value;

    if (!taskName) {
        errorString += 'Task Name cannot be empty.<br>';
    };
    if (!taskDescription) {
        errorString += 'Task Description cannot be empty.<br>';
    };
    if (!assignedTo) {
        errorString += 'Assigned To cannot be empty.<br>';
    };
    if (!dueDate) {
        errorString += 'Due Date cannot be empty.<br>';
    };
    if (!taskStatus) {
        errorString += 'Status cannot be empty.<br>';
    };

    // Displays errorString in bootstrap box
    const popError = () => {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorMessage').innerHTML = errorString;
    }

    if (errorString) {
        popError();
        return;
    } else {
        manager.addTask(taskName, taskDescription, assignedTo, dueDate, taskStatus);
        manager.render();
        manager.save();
        document.getElementById('task-name').value = '';
        document.getElementById('task-description').value = '';
        document.getElementById('assigned-to').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('task-status').value = '';
        document.getElementById('errorMessage').style.display = '';
    }
}

/* If a trash can icon is clicked on, the closest li element's display property is set to none so it looks like the card was removed. If a trash can or any of the other buttons are clicked, getTaskById is called. The specified changes are carried out on the selected task. The task was selectd by its id. */
function modifyCard(event) {
    let parentId = '';
    if (event.target.classList.contains('fa-trash')) {
        // pop up comfirmation before delete task

        var r = confirm("Are you sure you want to delete this task?");
        if (r !== true) {
            return;
        } else {
            parentId = event.target.closest('li').id;
            document.getElementById(parentId).style.display = 'none';
            let numId = Number(parentId);
            manager.deleteTask(numId);
            manager.save();
            manager.render();
            return;
        }
    } else if (event.target.innerHTML === 'To Do') {
        parentId = event.target.closest('li').id;
        let numId = Number(parentId);
        manager.getTaskById(numId, 'To Do');
        manager.save();
        manager.render();
        return;
    } else if (event.target.innerHTML === 'In Progress') {
        parentId = event.target.closest('li').id;
        let numId = Number(parentId);
        manager.getTaskById(numId, 'In Progress');
        manager.save();
        manager.render();
        return;
    } else if (event.target.innerHTML === 'Review') {
        parentId = event.target.closest('li').id;
        let numId = Number(parentId);
        manager.getTaskById(numId, 'Review');
        manager.save();
        manager.render();
        return;
    } else if (event.target.innerHTML === 'Done') {
        parentId = event.target.closest('li').id;
        let numId = Number(parentId);
        manager.getTaskById(numId, 'Done');
        manager.save();
        manager.render();
        return;
    };
};

// ANY TIME the HTML element holding the task cards is defined and assigned an event handler. This event handler is the modifyCard() function.
const taskList = document.getElementById('task-list-ul');
taskList.addEventListener('click', modifyCard);

// ANY TIME the submit button is defined and assigned an event handler. The event handler is the validFormFieldInput() function.
const eventTarget = document.getElementById('newTaskForm');
eventTarget.addEventListener('submit', validFormFieldInput);