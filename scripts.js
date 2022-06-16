//"Корзина"
let onDel = [];

//Функция отчистки "корзины"
function del() {
    while (onDel.length > 0) {
        localStorage.removeItem(onDel.pop());
    }
}

//Функция удаления всех пунктов списка
function delAll() {
    localStorage.clear();
    location.reload();
}

//Функция подгрузки элементов списка из localstorage
function init() {
    alert(localStorage.length);
    if(localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            alert(localStorage.key(i) + ' ' + localStorage.getItem(localStorage.key(i)));
            addElement(localStorage.key(i), false);
        }
    }
    /*
    addCloseInit();
    addCloseListenersInit();
    addCheckedListenersInit();
     */
}

//Функция добавления к элементу списка кнопки удаления
function addClose(target) {
    let newButton = document.createElement("span");
    newButton.className = "close";
    target.appendChild(newButton);
    return newButton;
}

//Функция добавления кнопки удаления ко всем элементам списка
function addCloseInit() {
    let liList = document.getElementsByTagName("li");
    for (let i = 0; i < liList.length; i++) {
        addClose(liList[i]);
    }
}

//Функция добавления обработчика к кнопке удаления
function addCloseListener(target) {
    target.onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
        onDel.push(target.parentElement.childNodes[0].textContent);
    }
}

//Функция добавления обработчиков ко всем кнопкам удаления
function addCloseListenersInit() {
    let close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
        addCloseListener(close[i]);
    }
}

//Функция добавления обработчика нажатия на пункт списка - выполнено/не выполнено
function addCheckedListener(target) {
    target.onclick = function () {
        //target.classList.toggle("checked");

        localStorage.setItem(target.childNodes[0].textContent, target.classList.toggle("checked").toString());
    }
    //return target.childNodes[0].textContent;
}

//Функция добавления обработчика нажатия на все пункты списка
function addCheckedListenersInit() {
    let liList = document.getElementsByTagName("li");
    for (let i = 0; i < liList.length; i++) {
        addCheckedListener(liList[i]);
    }
}

//Функция добавления нового пункта списка
function addElement(input = document.getElementById("newTaskText").value, write = true) {
    let text = input;
    let newLi = document.createElement('li');
    let textNode = document.createTextNode(text);
    newLi.appendChild(textNode);
    if (text === '') {
        alert("Пустой текст!");
    } else {
        let myUL = document.getElementById("taskUL");
        myUL.appendChild(newLi);
    }
    document.getElementById("newTaskText").value = "";

    addCloseListener(addClose(newLi));
    addCheckedListener(newLi);
    let value = localStorage.getItem(text);
    if (value === "true") {
        newLi.classList.toggle("checked");
    }
    if (write) {
        localStorage.setItem(text, value);
    }
}
init();
//TODO: Фильтрация - сделано/не сделано/все