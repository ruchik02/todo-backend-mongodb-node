let todos = [];
let res = false;
function getTodos() {
    fetch("/gettodos").then((response) => {
        return response.text();
    }).then((data) => {
        todos = JSON.parse(data);
        console.log(todos,"8");
        obj.show();
        obj.count();
    })
}
class todo {
    constructor(text, completed) {
        this.text = text;
        this.completed = completed;
    }
}
class myTodo {
    constructor() {}
    count() {
        let count = 0;
        for (let i in todos) {
            if (todos[i].completed == false) {
                count++;
            }
        }
        let countValue = document.getElementById("count");
        countValue.innerText = count;
        console.log(countValue,count,"31");
    }
    clearCompleted() {
        fetch("/clearcompleted").then((response) => {
            return response.text();
        }).then((data) => {
            todos = JSON.parse(data);
            console.log(todos);
            obj.show();
            obj.count();
        })
    }
    remove(i) {
        let id = todos[i]._id;   
        fetch('/removetodo/' + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                todos = data;
                obj.show();
                obj.count();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    add(task) {
        console.log(task);
        fetch('/addtodo', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                todos = data;
                obj.show();
                obj.count();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    showCompleted() {
        console.log("showCompleted")
        let todo = document.getElementById("todos");
            todo.innerHTML = "";
            active.style.border=`none`
            all.style.border='none'
            let completed=document.getElementById('completed');
            completed.style.border=`1px solid rgba(175, 47, 47, 0.2)`
        let html = ``;
        for (let todo1 in todos) {
            if (todos[todo1].completed === true) {
                html += `<div class="todos" id="todos">
                <ul id="ul" class="todo-list">
                    <li>
                    <input type="checkbox" onclick="obj.toggle(event,${todo1})" checked name="checkbox" id="checker" class="check-box">
                    <label for="todoLbael" class="data line-through">${this.todos[todo1].text}</label>
                    <label for="todoCross" class="cross" onclick=(obj.remove(${todo1}))>X</label>
                </li>
                </ul>
            </div>`;
            }
        }
        todo.innerHTML = html;
    }
    show() {
        let todo = document.getElementById("todos");
        todo.innerHTML = "";
        let all = document.getElementById("all");
        all.style.border = `1px solid rgba(175, 47, 47, 0.2)`;
        active.style.border = `none`;
        completed.style.border = `none`;
        let html = ``;
        for (let todo1 in todos) {
          if (todos[todo1].completed === true) {
            html += `<div class="todos" id="todos">
                    <ul id="ul" class="todo-list">
                        <li>
                        <input type="checkbox" onclick="obj.toggle(event,${todo1})" checked name="checkbox" id="checker" class="check-box">
                        <label for="todoLbael" class="data line-through">${todos[todo1].text}</label>
                        <label for="todoCross" class="cross" onclick=(obj.remove(${todo1}))>X</label>
                    </li>
                    </ul>
                </div>`;
          } else {
            html += `<div class="todos" id="todos">
                    <ul id="ul" class="todo-list">
                        <li>
                        <input type="checkbox" onclick="obj.toggle(event,${todo1})" name="checkbox" id="checker" class="check-box">
                        <label for="todoLbael" class="data">${todos[todo1].text}</label>
                        <label for="todoCross" class="cross" onclick=(obj.remove(${todo1}))>X</label>
                    </li>
                    </ul>
                </div>`;
          }    
        }
        todo.innerHTML = html;
    }
}
let inputText = document.getElementById("input-text");
let obj = new myTodo();
getTodos();
inputText.addEventListener("keypress", function (e) {
    if (e.key == 'Enter' && inputText.value != "") {
        let text = e.target.value;
        let task = new todo(text, false);
        obj.add(task);
        inputText.value = null;
    }
})

function clearCompleted() {
    obj.clearCompleted();
}

