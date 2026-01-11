const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const progress = document.getElementById("progress");
const count = document.getElementById("count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render Tasks
function render(){
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if(task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggle(${index})">
        <span>${task.text}</span>
      </div>
      <div class="actions">
        <i class='bx bx-edit' onclick="editTask(${index})"></i>
        <i class='bx bx-trash delete' onclick="deleteTask(${index})"></i>
      </div>
    `;

    list.appendChild(li);
  });

  updateProgress();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
addBtn.onclick = () => {
  if(input.value.trim() === "") return;
  tasks.push({text: input.value, completed:false});
  input.value="";
  render();
};

// Enter Key
input.addEventListener("keypress", e=>{
  if(e.key === "Enter") addBtn.click();
});

// Toggle Complete
function toggle(i){
  tasks[i].completed = !tasks[i].completed;
  render();
}

// Delete
function deleteTask(i){
  tasks.splice(i,1);
  render();
}

// Edit
function editTask(i){
  const newText = prompt("Edit your task", tasks[i].text);
  if(newText !== null){
    tasks[i].text = newText;
    render();
  }
}

// Progress
function updateProgress(){
  const total = tasks.length;
  const done = tasks.filter(t=>t.completed).length;

  count.innerText = `${done}/${total}`;

  const percent = total === 0 ? 0 : (done/total)*100;
  progress.style.width = percent + "%";
}

// Initial Load
render();
