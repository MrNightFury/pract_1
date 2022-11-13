"use strict"

login.onclick = function (){
    while (!confirm ("Желаете пройти регистрацию на сайте?")) {
        alert ("Попробуйте ещё раз");
    }
    alert ("Круто!");
}

admin.onclick = function (){
    let login = prompt ("Введите логин");
    if (!login) {
        alert ("Отменено");
        return;
    } else if (login != "Админ") {
        alert ("Вы кто такие? Я вас не знаю!");
        return;
    }
    let password = prompt ("Введите пароль");
    if (password == "Я главный") {
        alert ("Здравствуйте!");
    } else if (password) {
        alert ("Неверный пароль");
    } else {
        alert ("Отменено");
    }
}

like.onclick = function (){
    if (like.style.color == "black") {
        like.style.color = "white";
        like.style["background-color"] = "red";
    } else {
        like.style.color = "black";
        like.style["background-color"] = "white";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let isActive = false;
let oldTime = 0;

window.addEventListener('mousemove', (e) => {
    let date = new Date();
    let time = date.getMilliseconds() + date.getSeconds() * 1000;

    if (isActive && (time - oldTime) > 50) {
        oldTime = time;
        let x = e.pageX;
        let y = e.pageY;
        let heart = document.createElement('img');
        heart.src = "images/icons/heart.png"
        heart.alt = 'Сердце';
        heart.classList.add("heart");
        heart.style.top = y + "px";
        heart.style.left = x + "px";
        document.querySelector('#heart-container').appendChild(heart);
    }
});

clone.onclick = function (){
    isActive = !isActive;
}