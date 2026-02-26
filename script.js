let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");
const input = document.getElementById("taskInput");
// Salva no LocalStorage
function saveTasks() {
 localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Renderiza tarefas na tela
function renderTasks() {
 taskList.innerHTML = "";
 tasks.forEach((task, index) => {
 const li = document.createElement("li");
 li.textContent = task.text;
 if (task.completed) {
 li.classList.add("completed");
 }
 // Marcar como concluída
 li.addEventListener("click", function () {
    tasks[index].completed = !tasks[index].completed;
 saveTasks();
 renderTasks();
 });
 // Botão remover
 const removeBtn = document.createElement("button");
 removeBtn.textContent = "X";
 removeBtn.addEventListener("click", function (event) {
 event.stopPropagation();
 tasks.splice(index, 1);
 saveTasks();
 renderTasks();
 });
 li.appendChild(removeBtn);
 taskList.appendChild(li);
 });
}
// Adicionar tarefa
function addTask() {
 const taskText = input.value.trim();
 if (taskText === "") {
 alert("Digite uma tarefa!");
 return;
 }
 tasks.push({
 text: taskText,
 completed: false
 });
 saveTasks();
 renderTasks();
 input.value = "";
}
// Carrega tarefas ao abrir a página
renderTasks();