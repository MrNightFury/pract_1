let contents = document.getElementById("contents");
contents.addEventListener ("click", e => {
    if (e.target.tagName == "A") {
        if (!confirm("Вы уверены")) {
            e.preventDefault();
        }
    }
});

let gallery = document.getElementById("gallery");
let current = document.getElementById("gallery-current");
let newImg = document.getElementById("gallery-new");
let changing = false;
gallery.addEventListener ("click", e => {
    if (!changing && e.target.parentNode.id == "miniatures" && current.src != e.target.src) {
        changing = true;
        newImg.src = e.target.src;
        newImg.style.opacity = 1;
        setTimeout (() => {
            current.src = e.target.src;
            newImg.style.opacity = 0;
        }, 1000);
        setTimeout (() => {
            changing = false;
        }, 2000);
    }
});

let files = document.getElementById("files");
files.addEventListener ("click", e => {
    if (e.target.tagName == "LI") {
        if (e.ctrlKey) {
            e.target.classList.toggle("selected");
        } else {
            let selected = document.querySelectorAll(".selected");
            for (let elem of selected) {
                elem.classList.remove("selected");
            }
            e.target.classList.toggle("selected");
        }
    } else {
        let selected = document.querySelectorAll(".selected");
        for (let elem of selected) {
            elem.classList.remove("selected");
        }
    }
})

let cursor = document.getElementById("cursor");
cursor.addEventListener("mousedown", e => {
    e.preventDefault();
    let line = document.getElementById("line");
    let width = parseFloat(getComputedStyle(cursor).width);
    let lineBegin = line.getBoundingClientRect().x;
    document.onmousemove = e => {
        if (e.pageX > lineBegin - width / 2 && e.pageX < parseFloat(getComputedStyle(line).width) + lineBegin - width / 2) {
            cursor.style.left = e.pageX + - lineBegin + "px";
        }
    }
    document.onmouseup = e => {
        document.onmousemove = null;
    }
})

let cost = 0;
let shop = document.getElementById("market");
let cartList = document.getElementById("cart-list");
let costElem = document.getElementById("cost");
shop.addEventListener("mousedown", e => {
    e.preventDefault();
    let item = e.target;
    if (item.tagName == "LI") {
        let movingItem = document.createElement("li");
        movingItem.innerHTML = item.innerHTML;
        movingItem.classList.toggle("moving");
        document.body.appendChild (movingItem);

        document.onmousemove = e => {
            movingItem.style.top = e.clientY + "px";
            movingItem.style.left = e.clientX + "px";
        }

        document.onmouseup = e => {
            movingItem.hidden = true;
            let elemBellow = document.elementFromPoint(e.clientX, e.clientY);
            if (elemBellow.id == "cart" || elemBellow.id == "cart-list" || elemBellow.parentNode.id == "cart-list") {
                cartList.appendChild (movingItem);
                movingItem.hidden = false;
                movingItem.classList.toggle("moving");
                cost += +movingItem.innerText;
                costElem.innerText = "Стоимость: " + cost;
            } else {
                movingItem.remove();
            }
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
})

let ship = document.getElementById("ship");
start = performance.now();
function animateShip (time) {
    let duration = 10000;
    let timeFraction = (time - start) % duration / duration;
    if (timeFraction < 0.5) {
        ship.style.left = timeFraction * 180 + "%";
        ship.style.transform = "scaleX(1)";
    } else {
        ship.style.left = (1 - timeFraction) * 180 + "%";
        ship.style.transform = "scaleX(-1)";
    }
    if (timeFraction > 1) timeFraction = 1;

    // ship.style.left = timeFraction * 90 + "%";
    requestAnimationFrame(animateShip);
}
requestAnimationFrame(animateShip);


let randomStart = performance.now();
let rand = Math.random();
let randomMax = rand * 180;
let randomShip = document.getElementById("random-ship");
let randomDuration = rand * 10000;
let last;
let lastTime = performance.now();
    
function animateRandomShip (time) {
    let timeFraction = (time - randomStart) % randomDuration / randomDuration;
    if (timeFraction < 0.5) {
        if (!last) {
            rand = Math.random();
            randomMax = rand * 180;
            randomDuration = rand * 10000;
            randomStart = performance.now();
            console.log(rand);
        }
        last = true;
        randomShip.style.left = timeFraction * randomMax + "%";
        randomShip.style.transform = "scaleX(1)";
    } else {
        last = false;
        randomShip.style.left = (1 - timeFraction) * randomMax + "%";
        randomShip.style.transform = "scaleX(-1)";
    }
    if (timeFraction > 1) timeFraction = 1;
    requestAnimationFrame(animateRandomShip);
}
requestAnimationFrame(animateRandomShip);

// requestAnimationFrame(time => {
//     let timeFraction = (time - start) / 100;
//     if (timeFraction > 1) timeFraction = 1;

//     ship.style.left = timeFraction * 90 + "%";
//     requestAnimationFrame(animate);
// })

// function animate({duration, draw, timing}) {
//   let start = performance.now();
//   requestAnimationFrame(function animate(time) {
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;
//     let progress = timing(timeFraction)
//     draw(progress);
//     if (timeFraction < 1) {
//       requestAnimationFrame(animate);
//     }
//   });
// }