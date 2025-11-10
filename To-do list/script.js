const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;
    
    const li = document.createElement("li");
    li.textContent = text;
    
    /* Show Date */
    
const time = document.createElement('span');
time.textContent = " (" + new Date().toLocaleString() +")";
time.style.fontsize = '12px'
time.style.color = '#888'
li.appendChild(time);
    
    li.addEventListener('click', () => {
        li.classList.toggle('done');
        saveTasks();
    });
    
    /* btn delete task*/
    
    const del = document.createElement("button");
    del.textContent = "❌";
    del.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    
    li.appendChild(del);
    taskList.appendChild(li);
    
    taskInput.value = "";
    saveTasks();
}

    /* save to localStorage */
    
function saveTasks() {
    const tasks = [];
    
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent, 
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks",
    JSON.stringify(tasks));
}

    /* load from localStorage*/

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t.text;
        if (t.done) li.classList.add("done");
        
        const del = document.createElement("button");
        del.textContent = "❌";
        del.addEventListener("click", () => {
            li.remove();
            saveTask();
    });
    
    li.appendChild(del);
    li.addEventListener("click", () => {
        li.classList.toggle("done");
        saveTask();
    });
    
    taskList.appendChild(li);
    });
}

    /* searchInput */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.firstChild.textContent.toLowerCase();
    li.style.display = text.includes(keyword) ? "flex" : "none";
  });
});

    /* filter */
    
const filterSelect = document.getElementById('filterSelect');

filterSelect.addEventListener('change', () => {
    const filter = filterSelect.value;
    document.querySelectorAll('#taskList li').forEach(li => {
        const isDone = li.classList.contains('done');
        
        if (filter === "all") li.style.display = "flex";
        else if (filter === "done" && isDone) li.style.display = 'flex';
        else if (filter === "undone" && !isDone) li.style.display = 'flex';
        else li.style.display = 'none';
    });
});

    /* can Enter */
    
taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
});