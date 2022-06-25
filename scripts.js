const lsArrayName = 'TasksArray';
let arr = {};

//Заполнение массива из localStorage, создание при отсутствии
function arrInit() {
    let a = localStorage.getItem(lsArrayName);
    if(a !== null) {
        arr = JSON.parse(a);
    }
    else {
        localStorage.setItem(lsArrayName, JSON.stringify(arr));
    }
}

//Обновление данных в localStorage
function updateLSArray() {
    localStorage.setItem(lsArrayName, JSON.stringify(arr));
    render();
}

//Отрисовка списка на экране
function render(checked = true, unchecked = true) {
    let myUL = document.getElementById("taskUL");
    myUL.innerHTML = '';

    function renderTask(text) {
        let newLi = document.createElement('li');
        let textNode = document.createTextNode(text);
        let myUL = document.getElementById("taskUL");
        newLi.appendChild(textNode);
        addCheckedListener(newLi);
        addClose(newLi);
        myUL.appendChild(newLi);
        return newLi;
    }

    if(Object.keys(arr).length > 0) {
        if(checked && unchecked) {
            for (let key in arr) {
                if (arr[key] !== 'true') {
                    renderTask(key);
                }
                else {
                    let newLi = renderTask(key);
                    newLi.classList.toggle("checked", true);
                }
            }
        }
        else {
            if (unchecked) {
                for (let key in arr) {
                    if (arr[key] !== 'true') {
                        renderTask(key);
                    }
                }
            }
            if (checked) {
                for (let key in arr) {
                    if (arr[key] === 'true') {
                        let newLi = renderTask(key);
                        newLi.classList.toggle("checked", true);
                    }
                }
            }
        }
    }
}

//Функция удаления всех пунктов списка
function delAll() {
    arr = {};
    localStorage.setItem(lsArrayName, JSON.stringify(arr));
    location.reload();
}

//Фильтр "только выполненные"
function filterChecked() {
    let myUL = document.getElementById("taskUL");
    myUL.innerHTML = '';
    render(true, false);
}

//Фильтр "только невыполненные"
function filterUnchecked() {
    let myUL = document.getElementById("taskUL");
    myUL.innerHTML = '';
    render(false, true);
}

//Фильтр "все"
function filterAll() {
    let myUL = document.getElementById("taskUL");
    myUL.innerHTML = '';
    render();
}

//Функция добавления к элементу списка кнопки удаления
function addClose(target) {
    let newButton = document.createElement("span");
    newButton.className = "close";
    newButton.onclick = function () {
        target.style.display = "none";
        delete arr[target.childNodes[0].textContent];
        updateLSArray();
        event.stopPropagation();
    }
    target.appendChild(newButton);

}

//Функция добавления обработчика нажатия на пункт списка - выполнено/не выполнено
function addCheckedListener(target) {
    target.onclick = function () {
        target.classList.toggle("checked");
        arr[target.textContent] = target.classList.contains("checked").toString();
        updateLSArray();
        //updateChecked();
    }
}

//Функция добавления нового пункта списка
function addElement() {
    let text = document.getElementById("newTaskText").value;

    if(arr[text] !== undefined) {
        alert('Такое уже есть!');
        document.getElementById("newTaskText").value = "";
        return;
    }
    else if (text === '') {
        alert("Пустой текст!");
        document.getElementById("newTaskText").value = "";
        return;
    } else {
        arr[text] = 'false';
        updateLSArray();
        render();
    }

    document.getElementById("newTaskText").value = "";
}

arrInit();
render();