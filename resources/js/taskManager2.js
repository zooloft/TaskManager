// createTaskHTML takes in parameters from the current task stored in this.tasks and creates the HTML for it.
const createTaskHtml = (taskId, taskName, taskDescription, assignedTo, dueDate, taskStatus) => {
    let html = `
    <li class="list-group-item" id="${taskId}">
        <div class="card">
            <div class="card-body container">
        
                <div class="row">
                    <div class="col-7">
                        <h5 class="card-title">${taskName}</h5>
                        <p class="card-text">${taskDescription}</p>
                    </div>
                    <div class="col-5"><button type="button" style="cursor:default" class="btn `

    if (taskStatus === 'To Do') {
        html += 'btn-danger';
    } else if (taskStatus === 'In Progress') {
        html += 'btn-warning';
    } else if (taskStatus === 'Review') {
        html += 'btn-info';
    } else {
        html += 'btn-success';
    };

    html += ` btn-sm btn-block">&nbsp;${taskStatus}&nbsp;</button><br><strong>Due Date</strong>
    <br>${dueDate}<br><strong>Assigned To</strong>
                        <br>${assignedTo}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 buttonrow"> `
    if (taskStatus !== 'To Do') {
        html += `<button id="toDo${taskId}" type="button" class="btn btn-outline-danger btn-sm">To Do</button> `
    }
    if (taskStatus !== 'In Progress') {
        html += `<button id="inProgress${taskId}" type="button" class="btn btn-outline-warning btn-sm">In Progress</button> `
    }
    if (taskStatus !== 'Review') {
        html += `<button id="review${taskId}" type="button" class="btn btn-outline-info btn-sm">Review</button> `
    }
    if (taskStatus !== 'Done') {
        html += `<button id="done${taskId}" type="button" class="btn btn-outline-success btn-sm">Done</button> `
    }

    html += `<i class="fa fa-trash fa-2x"></i>
                    </div>
                </div>
            </div>
        </div>
    </li>`
    return html;
};

//Stores addTask, render, getTaskById, save, load, deleteTask, getTaskById, the this.tasks array, and the current id
class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    /* STEP 3 --> addTask stores the values inside of the input fields and places them into an object. This object is than added to the this.tasks array */
    addTask(name, description, assignedTo, dueDate, status = 'To Do') {
        this.currentId++;
        this.tasks.push({
            id: this.currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
        });
    }

    /* STEP 4 --> If the task array is not empty, each task in task array is converted to HTML using createTaskHtml and stored in a new array called taskHtmlList. Then, the tasksHTMLList array is converted into a string and stored as the innerHTML of the empty task list */
    render() {
        if (this.tasks.length > 0) {
            const taskHtmlList = [];
            this.tasks.forEach(task => {
                let fullDate = new Date(task.dueDate);
                var d = new Date(task.dueDate);
                var weekday = new Array(7);
                weekday[0] = "Sun";
                weekday[1] = "Mon";
                weekday[2] = "Tue";
                weekday[3] = "Wed";
                weekday[4] = "Thu";
                weekday[5] = "Fri";
                weekday[6] = "Sat";

                var n = weekday[d.getDay() + 1];
                let formattedDate = `${n} ${fullDate.getMonth() + 1}/${fullDate.getDate() + 1}/${fullDate.getFullYear()}`
                let taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status);
                taskHtmlList.push(taskHtml);
            });
            const tasksHtml = taskHtmlList.join('\n');
            document.getElementById('task-list-ul').innerHTML = tasksHtml;
            document.getElementById('TLheading').style.display = 'block';
        }
        // if tasks array now empty, hide Tasks List heading
        if (this.tasks.length === 0) {
            document.getElementById('TLheading').style.display = 'none';
        }

    }

    // Step 5 --> takes this.tasks and the current id and stores them inside of the the browsers local storage
    save() {
        let tasksJSON = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJSON);
        let currentId = this.currentId.toString();
        localStorage.setItem('currentId', currentId);
    }

    // takes everything out of local storage and stores them inside of the this.tasks and the current id
    load() {
            let tasksJSON = localStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJSON);
            let currentId = localStorage.getItem('currentId');
            this.currentId = Number(currentId);

        }
        //It excludes the task that is selected for removal and stores the rest in a new array called newTasks. This.tasks is updated to newTasks.

    /* Receives the selected task's id and the change that needs to be made as parameters. It locates the task by id in the this.tasks array and if the change is 'Delete", it invokes the deleteTask method on the task. If the change is anything else, the status is updated to match the contents of taskChange */
    getTaskById(taskId, taskChange) {
        let foundTask;
        this.tasks.forEach(task => {
            if (taskId === task.id) {
                foundTask = task;
            };
        });
        foundTask.status = taskChange;

    }

    deleteTask(taskId) {
        let newTasks = [];
        this.tasks.forEach(task => {
            if (taskId !== task.id) {
                newTasks.push(task);
            };
            this.tasks = newTasks;
        });

    }
}

module.exports = TaskManager;