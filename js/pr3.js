"use strict";

var itemList = [];

function newItem (name, price) {
    itemList.push ({
        name: name,
        price: +price
    });
    showItemInList (name, price, itemList.length - 1);
    updatePrice();
}

function showItemInList (name, price, index) {
    let item = document.createElement('li');
    item.id = "cart-item-" + index;
    item.innerHTML = "<span>" + name + " " + price + "</span>";
    let button = document.createElement('button');
    button.innerText = "Удалить";
    button.onclick = function () {
        if (itemList.length == 1) {
            itemList = [];
        }
        itemList.splice (index, 1);
        let elem = document.getElementById("cart-item-" + index);
        elem.remove();
        updatePrice();
    }
    item.appendChild(button);
    
    document.querySelector('.cart > ul').appendChild(item);
}

// show.onclick = function () {
//     for (let item of itemList) {
//         alert (item.name);
//     }
// }

function updatePrice () {
    let price = 0;
    for (let item of itemList) {
        price += item.price;
    }
    document.querySelector('.cart > div > p').innerText = "Сумма: " + price;
}

add.onclick = function () {
    newItem (prompt("Имя"), +prompt("Цена"));
}

showRange.onclick = function () {
    let min = +prompt("Мин");
    let max = +prompt("Макс");
    getRange (itemList, min, max);
}
    
function getRange (items, min, max) {
    let arr = [];
    for (let item of itemList) {
        if (item.price >= min && item.price <= max) {
            arr.push (item.price);
        }
    }
    alert (arr);
}

function compareItems (a, b) {
    if (a.price > b.price) return 1;
    if (a.price == b.price) return 0;
    if (a.price < b.price) return -1;
}

sort.onclick = function () {
    itemList.sort(compareItems);
    document.querySelector('.cart > ul').innerText = "";
    for (let i = 0; i < itemList.length; i++) {
        showItemInList (itemList[i].name, itemList[i].price, i);
    }
}

function addAlert (text) {
    let item = document.createElement('li');
    item.innerText = text;
    document.getElementById('alert-list').appendChild(item);
    document.getElementById('alert-count').innerHTML++;
}

var alertAddInterval = setInterval(addAlert, 3000);

a.onclick = function () {
    clearInterval (alertAddInterval);
    setTimeout (() => {
        alertAddInterval = setInterval(addAlert, 3000);
    }, 10000)
}