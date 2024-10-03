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
    let alphaR = (alpha * Math.PI) / 180;
    let bettaR = (betta * Math.PI) / 180;
    let b = a - h * (cot(alphaR) + cot(bettaR));

    let s = 0.5 * (a + b) * h;

    return s;
}

function getSquareByMode2(a, b, c, d) {
    let p = (a + b + c + d) / 2;
    let s = (a + b) / Math.abs(a -  b) * Math.sqrt((p - a) * (p - b) * (p - a - c) * (p - a - d));

    return s;
}

function getAngleBetweenDiagonalsByMode1(a, h, alpha, betta) {
    let alphaR = (alpha * Math.PI) / 180;
    let bettaR = (betta * Math.PI) / 180;
    let b = a - h * (cot(alphaR) + cot(bettaR));

    let l1 = h / Math.sin(alphaR);
    let l2 = h / Math.sin(bettaR);

    let d1 = Math.sqrt(Math.pow(a, 2) + Math.pow(l1, 2) - 2 * a * l1 * Math.cos(alphaR));
    let d2 = Math.sqrt(Math.pow(a, 2) + Math.pow(l2, 2) - 2 * a * l2 * Math.cos(bettaR));

    let gamma = Math.acos((Math.pow(d1, 2) + Math.pow(d2, 2) - Math.pow(a - b, 2)) / (2 * d1 * d2));
    gamma = gamma * (180 / Math.PI)

    return gamma;
}

function getAngleBetweenDiagonalsByMode2(a, b, c, d) {
    let d1 = Math.sqrt(Math.pow(d, 2) + a * b - a * (Math.pow(d, 2) - Math.pow(c, 2)) / (a - b));
    let d2 = Math.sqrt(Math.pow(c, 2) + a * b - a * (Math.pow(c, 2) - Math.pow(d, 2)) / (a - b));

    let gamma = Math.acos((Math.pow(d1, 2) + Math.pow(d2, 2) - Math.pow(a - b, 2)) / (2 * d1 * d2));
    gamma = gamma * (180 / Math.PI)

    return gamma;
}

function getDiagonalsByMode1(a, h, alpha, betta) {
    let alphaR = (alpha * Math.PI) / 180;
    let bettaR = (betta * Math.PI) / 180;

    let l1 = h / Math.sin(alphaR);
    let l2 = h / Math.sin(bettaR);

    let d1 = Math.sqrt(Math.pow(a, 2) + Math.pow(l1, 2) - 2 * a * l1 * Math.cos(alphaR));
    let d2 = Math.sqrt(Math.pow(a, 2) + Math.pow(l2, 2) - 2 * a * l2 * Math.cos(bettaR));

    return [d1, d2];
}

function getDiagonalsByMode2(a, b, c, d) {
    let d1 = Math.sqrt(Math.pow(d, 2) + a * b - a * (Math.pow(d, 2) - Math.pow(c, 2)) / (a - b));
    let d2 = Math.sqrt(Math.pow(c, 2) + a * b - a * (Math.pow(c, 2) - Math.pow(d, 2)) / (a - b));

    return [d1, d2];
}

function getPerimeterByMode1(a, h, alpha, betta) {
    let alphaR = (alpha * Math.PI) / 180;
    let bettaR = (betta * Math.PI) / 180;
    let b = a - h * (cot(alphaR) + cot(bettaR));

    let l1 = h / Math.sin(alphaR);
    let l2 = h / Math.sin(bettaR);

    let p = a + b + l1 + l2;

    return p;
}

function getPerimeterByMode2(a, b, c, d) {
    let p = a + b + c + d;

    return p;
}

function showOutput(labelText, valueText) {
    let label = document.createElement("div");
    document.getElementById("output-content").append(label);
    label.innerText = labelText;

    let value = document.createElement("div");
    document.getElementById("output-content").append(value);
    value.innerText = valueText;
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

function showMode1() {
    html = `
    <input name="a" type="number" placeholder="Основание a" id="input-a">
    <input name="b" type="number" placeholder="Высота b" id="input-b">
    <input name="alpha" type="number" placeholder="Угол α" id="input-alpha">
    <input name="betta" type="number" placeholder="Угол β" id="input-betta">`;
    document.getElementById("inputs").innerHTML = html;
    document.getElementById("trap-img").src = "img/trap1.png";

    let inputA = document.getElementById("input-a");
    let inputB = document.getElementById("input-b");
    let inputAlpha = document.getElementById("input-alpha");
    let inputBetta = document.getElementById("input-betta");

    inputA.addEventListener("click", () => {
        inputA.classList.remove("red-border");
    });

    inputB.addEventListener("click", () => {
        inputB.classList.remove("red-border");
    });

    inputAlpha.addEventListener("click", () => {
        inputAlpha.classList.remove("red-border");
    });

    inputBetta.addEventListener("click", () => {
        inputBetta.classList.remove("red-border");
    });
}

function showMode2() {
    html = `
    <input name="a" type="number" placeholder="Сторона a" id="input-a">
    <input name="b" type="number" placeholder="Сторона b" id="input-b">
    <input name="c" type="number" placeholder="Сторона c" id="input-c">
    <input name="d" type="number" placeholder="Сторона d" id="input-d">`;
    document.getElementById("inputs").innerHTML = html;
    document.getElementById("trap-img").src = "img/trap2.png";

    let inputA = document.getElementById("input-a");
    let inputB = document.getElementById("input-b");
    let inputC = document.getElementById("input-c");
    let inputD = document.getElementById("input-d");

    inputA.addEventListener("click", () => {
        inputA.classList.remove("red-border");
    });

    inputB.addEventListener("click", () => {
        inputB.classList.remove("red-border");
    });

    inputC.addEventListener("click", () => {
        inputC.classList.remove("red-border");
    });

    inputD.addEventListener("click", () => {
        inputD.classList.remove("red-border");
    });
}

function showInputs() {
    clear();
    currentMode = document.getElementById("inputs-mode").elements["mode"].value;

    if (currentMode == "1") {
        showMode1();
    }
    else {
        showMode2();
    }
}

function highlightOutputCheckboxes() {
    document.getElementById("output-s").parentElement.style.color = "red";
    document.getElementById("output-a").parentElement.style.color = "red";
    document.getElementById("output-d").parentElement.style.color = "red";
    document.getElementById("output-p").parentElement.style.color = "red";
}

function removeHighlightingOutputCheckboxes() {
    document.getElementById("output-s").parentElement.style.color = null;
    document.getElementById("output-a").parentElement.style.color = null;
    document.getElementById("output-d").parentElement.style.color = null;
    document.getElementById("output-p").parentElement.style.color = null;
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
            if (aValue == "")
                document.getElementById("input-a").classList.add("red-border");

            if (bValue == "")
                document.getElementById("input-b").classList.add("red-border");

            if (alphaValue == "")
                document.getElementById("input-alpha").classList.add("red-border");

            if (bettaValue == "")
                document.getElementById("input-betta").classList.add("red-border");

            showError("Пожалуйста, введите входные данные.")
            return;
        }
        else if (validateInput(aValue) || validateInput(bValue) || validateInput(alphaValue) || validateInput(bettaValue)) {
            if (validateInput(aValue)) {
                document.getElementById("input-a").classList.add("red-border");
                document.getElementById("input-a").value = "";
            }

            if (validateInput(bValue)) {
                document.getElementById("input-b").classList.add("red-border");
                document.getElementById("input-b").value = "";
            }

            if (validateInput(alphaValue)) {
                document.getElementById("input-alpha").classList.add("red-border");
                document.getElementById("input-alpha").value = "";
            }

            if (validateInput(bettaValue)) {
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

        let hasInput = false;
        document.getElementById("output-content").innerHTML = "";

        if (document.getElementById("output-s").checked) {
            let square = getSquareByMode1(aValue, bValue, alphaValue, bettaValue);
            showOutput("Площадь:", square.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-a").checked) {
            let angleBetweenDiagonals = getAngleBetweenDiagonalsByMode1(aValue, bValue, alphaValue, bettaValue);
            showOutput("Угол между диагоналями:", angleBetweenDiagonals.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-d").checked) {
            let diagonals = getDiagonalsByMode1(aValue, bValue, alphaValue, bettaValue);
            let d1 = diagonals[0];
            let d2 = diagonals[1];
            showOutput("Диагональ 1:", d1.toFixed(2));
            showOutput("Диагональ 2:", d2.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-p").checked) {
            let perimeter = getPerimeterByMode1(aValue, bValue, alphaValue, bettaValue);
            showOutput("Периметр:", perimeter.toFixed(2));
            hasInput = true;
        }

        if (!hasInput) {
            showError("Пожалуйста, выберите выходные данные.");
            highlightOutputCheckboxes();
        }
    }
    else {
        document.getElementById("input-a").classList.remove("red-border");
        document.getElementById("input-b").classList.remove("red-border");
        document.getElementById("input-c").classList.remove("red-border");
        document.getElementById("input-d").classList.remove("red-border");

        let aValue = document.getElementById("input-a").value;
        let bValue = document.getElementById("input-b").value;
        let cValue = document.getElementById("input-c").value;
        let dValue = document.getElementById("input-d").value;

        if (aValue == "" || bValue == "" || cValue == "" || dValue == "") {
            if (aValue == "")
                document.getElementById("input-a").classList.add("red-border");

            if (bValue == "")
                document.getElementById("input-b").classList.add("red-border");

            if (cValue == "")
                document.getElementById("input-c").classList.add("red-border");

            if (dValue == "")
                document.getElementById("input-d").classList.add("red-border");

            showError("Пожалуйста, введите входные данные.")
            return;
        }
        else if (validateInput(aValue) || validateInput(bValue) || validateInput(cValue) || validateInput(dValue)) {
            if (validateInput(aValue)) {
                document.getElementById("input-a").classList.add("red-border");
                document.getElementById("input-a").value = "";
            }

            if (validateInput(bValue)) {
                document.getElementById("input-b").classList.add("red-border");
                document.getElementById("input-b").value = "";
            }

            if (validateInput(cValue)) {
                document.getElementById("input-c").classList.add("red-border");
                document.getElementById("input-c").value = "";
            }

            if (validateInput(dValue)) {
                document.getElementById("input-d").classList.add("red-border");
                document.getElementById("input-d").value = "";
            }

            showError("Пожалуйста, проверьте корректность введеных данных.")
            return;
        }

        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
        cValue = parseFloat(cValue);
        dValue = parseFloat(dValue);

        let hasInput = false;
        document.getElementById("output-content").innerHTML = "";

        if (document.getElementById("output-s").checked) {
            let square = getSquareByMode2(aValue, bValue, cValue, dValue);
            showOutput("Площадь:", square.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-a").checked) {
            let angleBetweenDiagonals = getAngleBetweenDiagonalsByMode2(aValue, bValue, cValue, dValue);
            showOutput("Угол между диагоналями:", angleBetweenDiagonals.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-d").checked) {
            let diagonals = getDiagonalsByMode2(aValue, bValue, cValue, dValue);
            let d1 = diagonals[0];
            let d2 = diagonals[1];
            showOutput("Диагональ 1:", d1.toFixed(2));
            showOutput("Диагональ 2:", d2.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-p").checked) {
            let perimeter = getPerimeterByMode2(aValue, bValue, cValue, dValue);
            showOutput("Периметр:", perimeter.toFixed(2));
            hasInput = true;
        }

        if (!hasInput) {
            showError("Пожалуйста, выберите выходные данные.");
            highlightOutputCheckboxes();
        }
    }
}

document.getElementById("show-inputs").addEventListener("click", showInputs);
document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("error-close").addEventListener("click", hideError);
document.getElementById("output-s").addEventListener("click", removeHighlightingOutputCheckboxes);
document.getElementById("output-a").addEventListener("click", removeHighlightingOutputCheckboxes);
document.getElementById("output-d").addEventListener("click", removeHighlightingOutputCheckboxes);
document.getElementById("output-p").addEventListener("click", removeHighlightingOutputCheckboxes);
showMode1();