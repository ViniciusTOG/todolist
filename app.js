//Selectors

const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners

document.addEventListener('DOMContentloaded', getTodos());
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions

function addTodo(event) {
	
	//Prevent form from submitting
	event.preventDefault();

	//Todo DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	//Create LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item')
	todoDiv.appendChild(newTodo);

	//ADD TODO TO LOCALSTORAGE
	saveLocalTodos(todoInput.value);

	//CHECKED BUTTON
	const checkedButton = document.createElement('button');
	checkedButton.innerHTML = "<i class='fas fa-check-square'></i>"
	checkedButton.classList.add('checked-btn')
	todoDiv.appendChild(checkedButton);


	//TRASH BUTTON
	const trashButton = document.createElement('button');
	trashButton.innerHTML = "<i class='fas fa-trash'></i>"
	trashButton.classList.add('trash-btn')
	todoDiv.appendChild(trashButton);

	//Add DIV to TodoList
	todoList.appendChild(todoDiv);

	//Clear INPUT VALUE
	todoInput.value = '';

}


//DELETE-CHECK TODO
function deleteCheck(e) {
	const item = e.target;

	if(item.classList[0] === "trash-btn"){
		const todo = item.parentElement;
		todo.classList.add('fall');
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function(){
			todo.remove();
		});
	}

	if(item.classList[0] === "checked-btn"){
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

//FILTER TODOS
function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		if(todo.nodeType == 1){
			switch(e.target.value){
				case "all":
					todo.style.display = "flex";
					break;
				case "completed":
					if(todo.classList.contains('completed')){
						todo.style.display = 'flex';
					}else{
						todo.style.display = "none";
					}
					break;
				case "uncompleted":
					if(!todo.classList.contains('completed')){
						todo.style.display = 'flex';
					}else{
						todo.style.display = "none";
					}
					break;
			}
		}
	});	
 }

function saveLocalTodos(todo){
	//CHECK---HEY Do i already have things in there?
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	console.log("funcionou!");
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach(function(todo){
	//Todo DIV
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	//Create LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todo;
	newTodo.classList.add('todo-item')
	todoDiv.appendChild(newTodo);

	//CHECKED BUTTON
	const checkedButton = document.createElement('button');
	checkedButton.innerHTML = "<i class='fas fa-check-square'></i>"
	checkedButton.classList.add('checked-btn')
	todoDiv.appendChild(checkedButton);


	//TRASH BUTTON
	const trashButton = document.createElement('button');
	trashButton.innerHTML = "<i class='fas fa-trash'></i>"
	trashButton.classList.add('trash-btn')
	todoDiv.appendChild(trashButton);

	//Add DIV to TodoList
	todoList.appendChild(todoDiv);
	});

}

function removeLocalTodos(todo) {
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}