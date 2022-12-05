let links = document.querySelectorAll("a");
for (let elem of links) {
    if(elem.href.includes("://") && !elem.href.includes("localhost") && !elem.href.includes("file:///")) {
        elem.style.color = "red";
    }
}

let list = document.getElementById("list-button");
list.addEventListener ("click", e => {
    while (true) {
        let content = prompt ("Введите содержимое пункта");
        if (!content) {
            break;
        }
        let elem = document.createElement("li");
        elem.innerText = content;
        document.getElementById("list").appendChild(elem);
    }
})

let i = 0;
let showAlert = document.getElementById("show-alert");
showAlert.addEventListener ("click", e => {
    let elem = document.createElement("li");
    elem.className = "notification";
    let text = document.createElement("p");
    text.innerText = "Это уведомление " + i; i++;
    elem.appendChild(text);
    document.getElementById("notification-container").appendChild(elem);
    addAlert ("Это уведомление");
    setTimeout (() => {
        elem.classList.add("notification-shown");
    }, 0);
    setTimeout (() => {
        elem.classList.remove("notification-shown");
    }, 2000);
    setTimeout (() => {
        elem.remove();
    }, 2500)
})

function addAlert (text) {
    let item = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = "x";
    button.className = "del"
    item.innerText = text;
    item.appendChild(button);
    document.getElementById('alert-list').appendChild(item);
    document.getElementById('alert-count').innerHTML++;
}

let alertList = document.getElementById("alert-list");
alertList.addEventListener ("click", e => {
    if (e.target.className == "del") {
        e.target.parentElement.remove();
        document.getElementById("alert-count").innerText--;
    }
})

function res(){
    cent = document.getElementById("centered");
    cent.style.marginLeft = ((window.innerWidth - cent.clientWidth) / 2).toString()+"px";
    cent.style.marginTop = ((window.innerHeight - cent.clientHeight) / 2).toString()+"px";
}
setInterval(res, 100);