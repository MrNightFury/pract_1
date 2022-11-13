function makeStringCaptcha (maxSize) {
    let size = maxSize / 2 + Math.floor(Math.random() * maxSize / 2)
    let result = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < size; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function numCaptcha () {
    let a = Math.floor(Math.random() * 100);
    let b = Math.floor(Math.random() * 100);
    return prompt (a + "+" + b + "=") == a + b;
}

captcha.onclick = function () {
    let checkbox = document.getElementById("captcha");
    if (checkbox.checked === true) {
        let captcha = makeStringCaptcha(10);
        if (prompt (captcha) == captcha || numCaptcha()) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    } else {
        checkbox.checked = true;
    }
}

function Accumulator (startingValue) {
    this.value = +startingValue;
    this.read = function () {
        let add = prompt ("Введите число для прибавления");
        this.value += +add;
        this.update();
    }
    this.update = function () {
        sum.textContent = "Сумма: " + this.value;
    }
}

var cart;
initialize.onclick = function () {
    cart = new Accumulator(prompt("Начальное значение"));
    cart.update();
    
}
add.onclick = function () {
    cart?.read();
}

truncate = function (str, maxlength) {
    if (str.length <= maxlength) {
        return str;
    } else {
        return str.substr (0, maxlength - 3) + "...";
    }
}

trunc.onclick = function () {
    alert (truncate (prompt ("Введите строку"), +prompt ("Введите длинну")));
}
