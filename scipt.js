let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.bot1'),
    addButton2 = document.querySelector('.bot2'),
    todo = document.querySelector('.todo');

let todoList = [];


if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}



addButton.addEventListener('click', function () {
    
    
    if (!addMessage.value) return;

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList))
    addMessage.value = '';


});

let clearList = addButton2;



function displayMessages() {

    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function (item, i) {
        displayMessage += `
<li>

<input type='checkbox' id='item_${i}' ;{item.cheked ? 'cheked' : 2}>
<label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>

</li>
`;
        todo.innerHTML = displayMessage;

    })

};


todo.addEventListener('change', function (event) {
    let idInput = event.target.getAttribute('id');
    let forLable = todo.querySelector('[for=' + idInput + ']');
    let valueLable = forLable.innerHTML;
    todoList.forEach(function (item) {
        if (item.todo === valueLable) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})


todo.addEventListener('contextmenu', function (event) {
    
    event.preventDefault();
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;

            }

            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }

    });
});

addButton2.addEventListener('click', function () {

 addMessage.value = '';
    localStorage.clear('todo');
    todoList.forEach(function(item, i){
        if(localStorage.clear){
            todoList.splice(0, 5);
            
        }
    })
    
    todo.innerHTML = [];

});


addMessage.addEventListener('keypress', function (event) {
    if(event.keyCode === 13){
        if (!addMessage.value) return;

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList))
    addMessage.value = '';


    }
    
});