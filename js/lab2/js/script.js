let currentMode = "1";

function showError(text) {
    document.getElementById("error-modal").style.display = "flex";
    document.getElementById("error-text").innerText = text;
  }
  
function hideError() {
    document.getElementById("error-modal").style.display = "none";
}

function validateInput(text) {
    let value = parseFloat(text);
    return isNaN(value);
}

function cot(x) {
    return 1 / Math.tan(x);
}

function getSquareByMode1(a, h, alpha, betta) {
    let alphaD = (alpha * Math.PI) / 180;
    let bettaD = (betta * Math.PI) / 180;
    let b = a - h * (cot(alphaD) + cot(bettaD));

    let s = 0.5 * (a + b) * h;

    return s;
}

function getAngleBetweenDiagonalsByMode1(a, h, alpha, betta) {
    let alphaD = (alpha * Math.PI) / 180;
    let bettaD = (betta * Math.PI) / 180;
    let b = a - h * (cot(alphaD) + cot(bettaD));

    let d1 = Math.sqrt(Math.pow(a, 2) + Math.pow(h, 2) - 2 * a * h * Math.cos(alphaD));
    let d2 = Math.sqrt(Math.pow(b, 2) + Math.pow(h, 2) - 2 * b * h * Math.cos(bettaD));

    let gamma = Math.acos((Math.pow(d1, 2) + Math.pow(d2, 2) - Math.pow(a - b, 2))/(2 * d1 * d2));
    gamma = gamma * (180 / Math.PI)

    return gamma;
}

function getDiagonalsByMode1(a, h, alpha, betta) {
    let alphaD = (alpha * Math.PI) / 180;
    let bettaD = (betta * Math.PI) / 180;
    let b = a - h * (cot(alphaD) + cot(bettaD));
    console.log(b);

    let d1 = Math.sqrt(Math.pow(a, 2) + Math.pow(h, 2) - 2 * a * h * Math.cos(alphaD));
    let d2 = Math.sqrt(Math.pow(b, 2) + Math.pow(h, 2) - 2 * b * h * Math.cos(bettaD));

    return [d1, d2];
}

function getPerimeterByMode1(a, h, alpha, betta) {
    let alphaD = (alpha * Math.PI) / 180;
    let bettaD = (betta * Math.PI) / 180;
    let b = a - h * (cot(alphaD) + cot(bettaD));

    let l1 = h / Math.sin(alphaD);
    let l2 = h / Math.sin(bettaD);

    let p = a + b + l1 + l2;

    return p;
}

function showOutput(text) {
    let p = document.createElement("p");
    p.innerText = text;
    document.getElementById("output-content").append(p);
}

function clear() {
    if (currentMode == "1") {
        document.getElementById("input-a").value = "";
        document.getElementById("input-b").value = "";
        document.getElementById("input-alpha").value = "";
        document.getElementById("input-betta").value = "";
    } 
    else {
        document.getElementById("input-a").value = "";
        document.getElementById("input-b").value = "";
        document.getElementById("input-c").value = "";
        document.getElementById("input-d").value = "";
    }

    document.getElementById("output-s").checked = false;
    document.getElementById("output-a").checked = false;
    document.getElementById("output-d").checked = false;
    document.getElementById("output-p").checked = false;

    document.getElementById("output-content").innerHTML = "";
}

function showInputs() {
    clear();
    currentMode = document.getElementById("inputs-mode").elements["mode"].value;

    if (currentMode == "1") {
        html = `
        <input name="a" type="number" placeholder="Основание a" id="input-a">
        <input name="b" type="number" placeholder="Высота b" id="input-b">
        <input name="alpha" type="number" placeholder="Угол α" id="input-alpha">
        <input name="betta" type="number" placeholder="Угол β" id="input-betta">`;
        document.getElementById("inputs").innerHTML = html;
        document.getElementById("trap-img").src = "img/trap1.png";
    }
    else {
        html = `
        <input name="a" type="number" placeholder="Сторона a" id="input-a">
        <input name="b" type="number" placeholder="Сторона b" id="input-b">
        <input name="c" type="number" placeholder="Сторона c" id="input-c">
        <input name="d" type="number" placeholder="Сторона d" id="input-d">`;
        document.getElementById("inputs").innerHTML = html;
        document.getElementById("trap-img").src = "img/trap2.png";
    }
}

function calculate() {
    if (currentMode == "1") {
        document.getElementById("input-a").classList.remove("red-border");
        document.getElementById("input-b").classList.remove("red-border");
        document.getElementById("input-alpha").classList.remove("red-border");
        document.getElementById("input-betta").classList.remove("red-border");

        let aValue = document.getElementById("input-a").value;
        let bValue = document.getElementById("input-b").value;
        let alphaValue = document.getElementById("input-alpha").value;
        let bettaValue = document.getElementById("input-betta").value;

        if (aValue == "" || bValue == "" || alphaValue == "" || bettaValue == "") {
            if(aValue == "")
                document.getElementById("input-a").classList.add("red-border");

            if(bValue == "")
                document.getElementById("input-b").classList.add("red-border");

            if(alphaValue == "")
                document.getElementById("input-alpha").classList.add("red-border");

            if(bettaValue == "")
                document.getElementById("input-betta").classList.add("red-border");

            showError("Пожалуйста, введите входные данные.")
            return;
        }
        else if (validateInput(aValue) || validateInput(bValue) || validateInput(alphaValue) || validateInput(bettaValue)) {
            if(validateInput(aValue)) {
                document.getElementById("input-a").classList.add("red-border");
                document.getElementById("input-a").value = "";
            }

            if(validateInput(bValue)) {
                document.getElementById("input-b").classList.add("red-border");
                document.getElementById("input-b").value = "";
            }

            if(validateInput(alphaValue)) {
                document.getElementById("input-alpha").classList.add("red-border");
                document.getElementById("input-alpha").value = "";
            }

            if(validateInput(bettaValue)) {
                document.getElementById("input-betta").classList.add("red-border");
                document.getElementById("input-betta").value = "";
            }

            showError("Пожалуйста, проверьте корректность введеных данных.")
            return;
        }
        
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
        alphaValue = parseFloat(alphaValue);
        bettaValue = parseFloat(bettaValue);

        document.getElementById("output-content").innerHTML = "";

        if (document.getElementById("output-s").checked) {
            let square = getSquareByMode1(aValue, bValue, alphaValue, bettaValue);
            showOutput(`Площадь: ${square}`);
        }

        if (document.getElementById("output-a").checked) {
            let angleBetweenDiagonals = getAngleBetweenDiagonalsByMode1(aValue, bValue, alphaValue, bettaValue);
            showOutput(`Угол между диагоналями: ${angleBetweenDiagonals}`);
        }

        if (document.getElementById("output-d").checked) {
            let diagonals = getDiagonalsByMode1(aValue, bValue, alphaValue, bettaValue);
            let d1 = diagonals[0];
            let d2 = diagonals[1];
            showOutput(`Диагонали: d1=${d1} d2=${d2}`);
        }

        if (document.getElementById("output-p").checked) {
            let perimeter = getPerimeterByMode1(aValue, bValue, alphaValue, bettaValue);
            showOutput(`Периметр: ${perimeter}`);
        }
    }
    else {

    }
}

document.getElementById("show-inputs").addEventListener("click", showInputs);
document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("error-close").addEventListener("click", hideError);