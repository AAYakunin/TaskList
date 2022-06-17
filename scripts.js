//Функция удаления всех пунктов списка
function delAll() {
    localStorage.clear();
    location.reload();
}

//Функция подгрузки элементов списка из localstorage
function init(checked = true, unchecked = true) {
    if(localStorage.length > 0) {
        if(unchecked) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(localStorage.key(i)) !== 'true') {
                    addElement(localStorage.key(i), false);
                }
            }
        }
        if(checked) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(localStorage.key(i)) === 'true') {
                    let newLi = addElement(localStorage.key(i), false, true);
                    newLi.classList.toggle("checked", true);
                }
            }
        }
    }
}

function filterChecked() {
    let myUL = document.getElementById("taskUL");
    myUL.innerHTML = '';
    init(true, false);
}

function filterUnchecked() {
    let myUL = document.getElementById("taskUL");
    myUL.innerHTML = '';
    init(false, true);
}

function filterAll() {
    let myUL = document.getElementById("taskUL");
    myUL.innerHTML = '';
    init();
}

//Функция обновления состояния выполнено/не выполнено
function updateChecked() {
    let lis = document.getElementsByTagName('li');
    for (let i = 0; i < lis.length; i++) {
        if(lis[i].style.display !== "none") {
            if (lis[i].classList.contains("checked"))
                localStorage.setItem(lis[i].textContent, "true");
            else
                localStorage.setItem(lis[i].textContent, "false");
        }
    }
}

//Функция добавления к элементу списка кнопки удаления
function addClose(target) {
    let newButton = document.createElement("span");
    newButton.className = "close";
    newButton.onclick = function () {
        target.style.display = "none";
        localStorage.removeItem(target.childNodes[0].textContent);
    }
    target.appendChild(newButton);

}

//Функция добавления обработчика нажатия на пункт списка - выполнено/не выполнено
function addCheckedListener(target) {
    target.onclick = function () {
        target.classList.toggle("checked");
        updateChecked();
    }
}

//Функция добавления нового пункта списка
function addElement(input = document.getElementById("newTaskText").value, write = true, checked = false) {
    let text = input;
    let newLi = document.createElement('li');
    let textNode = document.createTextNode(text);

    let lis = document.getElementsByTagName('li');
    for (let i = 0; i < lis.length; i++) {
        if(lis[i].textContent === text) {
            alert('Такое уже есть!');
            document.getElementById("newTaskText").value = "";
            return;
        }
    }
    if (text === '') {
        alert("Пустой текст!");
        document.getElementById("newTaskText").value = "";
        return;
    } else {
        let myUL = document.getElementById("taskUL");
        newLi.appendChild(textNode);
        addCheckedListener(newLi);
        addClose(newLi);
        myUL.appendChild(newLi);
    }
    document.getElementById("newTaskText").value = "";

    if (write) {
        localStorage.setItem(text, checked.toString());
    }
    return newLi;
}
init();

