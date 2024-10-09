let currentMode = "1";

function cot(x) {
    return 1 / Math.tan(x);
}

function showError(text) {
    document.getElementById("error-modal").style.display = "flex";
    document.getElementById("error-text").innerText = text;
}

function hideError() {
    document.getElementById("error-modal").style.display = "none";
}

function clearOutput() {
    document.getElementById("output-content").innerHTML = "";
}

function validateInput(text) {
    let value = parseFloat(text);
    return isNaN(value);
}

function isTrapezoidMode1(a, h, alpha, beta) {
    let alphaR = (Math.PI / 180) * alpha;
    let betaR = (Math.PI / 180) * beta;

    if (alpha + beta >= 180) {
        return false;
    }

    let x = h / Math.tan(alphaR);
    let y = h / Math.tan(betaR);

    let upperBase = a - x - y;
    console.log(upperBase)

    return upperBase > 0;
}

function isTrapezoidMode2(a, b, c, d) {
    if (a <= 0 || b <= 0 || c <= 0 || d <= 0) {
        return false;
    }

    if (a === b) {
        return false;
    }

    if (Math.abs(a - b) >= (c + d) || Math.abs(a - b) <= Math.abs(c - d)) {
        return false;
    }

    return true;
}

function validateInputByRegex(input) {
    clearOutput();

    const regex = /^[0-9]*[.,]?[0-9]*$/;

    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9.,]/g, '');
    }
}

function validateInputByRegex2(input) {
    clearOutput();

    const regex = /^[0-9]*[.,]?[0-9]*$/;

    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^0-9.,]/g, '');
    }

    const number = parseFloat(input.value.replace(',', '.'));
    if (number > 180) {
        input.value = '180';
    } else if (number < 0) {
        input.value = '0';
    }
}

function getSquareByMode1(a, h, alpha, beta) {
    if(!isTrapezoidMode1(a, h, alpha, beta))
        return NaN;

    let alphaR = (alpha * Math.PI) / 180;
    let betaR = (beta * Math.PI) / 180;
    let b = a - h * (cot(alphaR) + cot(betaR));

    let s = 0.5 * (a + b) * h;

    return s;
}

function getSquareByMode2(a, b, c, d) {
    if(!isTrapezoidMode2(a, b, c, d))
        return NaN;

    let p = (a + b + c + d) / 2;
    let s = (a + b) / Math.abs(a - b) * Math.sqrt((p - a) * (p - b) * (p - a - c) * (p - a - d));

    return s;
}

function getAngleBetweenDiagonalsByMode1(a, h, alpha, beta) {
    if(!isTrapezoidMode1(a, h, alpha, beta))
        return NaN;

    let alphaR = (alpha * Math.PI) / 180;
    let betaR = (beta * Math.PI) / 180;
    let b = a - h * (cot(alphaR) + cot(betaR));

    let l1 = h / Math.sin(alphaR);
    let l2 = h / Math.sin(betaR);

    let d1 = Math.sqrt(Math.pow(a, 2) + Math.pow(l1, 2) - 2 * a * l1 * Math.cos(alphaR));
    let d2 = Math.sqrt(Math.pow(a, 2) + Math.pow(l2, 2) - 2 * a * l2 * Math.cos(betaR));

    let gamma = Math.acos((Math.pow(d1, 2) + Math.pow(d2, 2) - Math.pow(a - b, 2)) / (2 * d1 * d2));
    gamma = gamma * (180 / Math.PI)

    return gamma;
}

function getAngleBetweenDiagonalsByMode2(a, b, c, d) {
    if(!isTrapezoidMode2(a, b, c, d))
        return NaN;

    let d1 = Math.sqrt(Math.pow(d, 2) + a * b - a * (Math.pow(d, 2) - Math.pow(c, 2)) / (a - b));
    let d2 = Math.sqrt(Math.pow(c, 2) + a * b - a * (Math.pow(c, 2) - Math.pow(d, 2)) / (a - b));

    let gamma = Math.acos((Math.pow(d1, 2) + Math.pow(d2, 2) - Math.pow(a - b, 2)) / (2 * d1 * d2));
    gamma = gamma * (180 / Math.PI)

    return gamma;
}

function getDiagonalsByMode1(a, h, alpha, beta) {
    if(!isTrapezoidMode1(a, h, alpha, beta))
        return NaN;

    let alphaR = (alpha * Math.PI) / 180;
    let betaR = (beta * Math.PI) / 180;

    let l1 = h / Math.sin(alphaR);
    let l2 = h / Math.sin(betaR);

    let d1 = Math.sqrt(Math.pow(a, 2) + Math.pow(l1, 2) - 2 * a * l1 * Math.cos(alphaR));
    let d2 = Math.sqrt(Math.pow(a, 2) + Math.pow(l2, 2) - 2 * a * l2 * Math.cos(betaR));

    return [d1, d2];
}

function getDiagonalsByMode2(a, b, c, d) {
    if(!isTrapezoidMode2(a, b, c, d))
        return NaN;

    let d1 = Math.sqrt(Math.pow(d, 2) + a * b - a * (Math.pow(d, 2) - Math.pow(c, 2)) / (a - b));
    let d2 = Math.sqrt(Math.pow(c, 2) + a * b - a * (Math.pow(c, 2) - Math.pow(d, 2)) / (a - b));

    return [d1, d2];
}

function getPerimeterByMode1(a, h, alpha, beta) {
    if(!isTrapezoidMode1(a, h, alpha, beta))
        return NaN;

    let alphaR = (alpha * Math.PI) / 180;
    let betaR = (beta * Math.PI) / 180;
    let b = a - h * (cot(alphaR) + cot(betaR));

    let l1 = h / Math.sin(alphaR);
    let l2 = h / Math.sin(betaR);

    let p = a + b + l1 + l2;

    return p;
}

function getPerimeterByMode2(a, b, c, d) {
    if(!isTrapezoidMode2(a, b, c, d))
        return NaN;

    let p = a + b + c + d;

    return p;
}

function showOutput(labelText, valueText, isError = false) {
    let label = document.createElement("div");
    document.getElementById("output-content").append(label);
    label.innerText = labelText;

    let value = document.createElement("div");
    document.getElementById("output-content").append(value);
    value.innerText = valueText;

    if(isError)
        value.style.color = "red";
}

function clear() {
    if (currentMode == "1") {
        document.getElementById("input-a").value = "";
        document.getElementById("input-b").value = "";
        document.getElementById("input-alpha").value = "";
        document.getElementById("input-beta").value = "";
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

    clearOutput();
}

function showMode1() {
    html = `
    <div>Основание a:</div>
    <input name="a" type="number" placeholder="Основание a" id="input-a">
    <div>Высота b:</div>
    <input name="b" type="number" placeholder="Высота b" id="input-b">
    <div>Угол α:</div>
    <input name="alpha" type="number" placeholder="Угол α" id="input-alpha">
    <div>Угол β:</div>
    <input name="beta" type="number" placeholder="Угол β" id="input-beta">`;
    document.getElementById("inputs").innerHTML = html;
    document.getElementById("trap-img").src = "img/trap1.png";

    let inputA = document.getElementById("input-a");
    let inputB = document.getElementById("input-b");
    let inputAlpha = document.getElementById("input-alpha");
    let inputbeta = document.getElementById("input-beta");

    inputA.addEventListener("click", () => {
        inputA.classList.remove("red-border");
    });
    inputA.addEventListener("input", validateInputByRegex.bind(null, inputA))

    inputB.addEventListener("click", () => {
        inputB.classList.remove("red-border");
    });
    inputB.addEventListener("input", validateInputByRegex.bind(null, inputB))

    inputAlpha.addEventListener("click", () => {
        inputAlpha.classList.remove("red-border");
    });
    inputAlpha.addEventListener("input", validateInputByRegex2.bind(null, inputAlpha))

    inputbeta.addEventListener("click", () => {
        inputbeta.classList.remove("red-border");
    });
    inputbeta.addEventListener("input", validateInputByRegex2.bind(null, inputbeta))
}

function showMode2() {
    html = `
    <div>Сторона a:</div>
    <input name="a" type="number" placeholder="Сторона a" id="input-a">
    <div>Сторона b:</div>
    <input name="b" type="number" placeholder="Сторона b" id="input-b">
    <div>Сторона c:</div>
    <input name="c" type="number" placeholder="Сторона c" id="input-c">
    <div>Сторона d:</div>
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
    inputA.addEventListener("input", validateInputByRegex.bind(null, inputA))

    inputB.addEventListener("click", () => {
        inputB.classList.remove("red-border");
    });
    inputB.addEventListener("input", validateInputByRegex.bind(null, inputB))

    inputC.addEventListener("click", () => {
        inputC.classList.remove("red-border");
    });
    inputC.addEventListener("input", validateInputByRegex.bind(null, inputC))

    inputD.addEventListener("click", () => {
        inputD.classList.remove("red-border");
    });
    inputD.addEventListener("input", validateInputByRegex.bind(null, inputD))
}

function showInputs(mode) {
    clear();
    currentMode = mode;

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
        document.getElementById("input-beta").classList.remove("red-border");

        let aValue = document.getElementById("input-a").value;
        let bValue = document.getElementById("input-b").value;
        let alphaValue = document.getElementById("input-alpha").value;
        let betaValue = document.getElementById("input-beta").value;

        if (aValue == "" || bValue == "" || alphaValue == "" || betaValue == "") {
            if (aValue == "")
                document.getElementById("input-a").classList.add("red-border");

            if (bValue == "")
                document.getElementById("input-b").classList.add("red-border");

            if (alphaValue == "")
                document.getElementById("input-alpha").classList.add("red-border");

            if (betaValue == "")
                document.getElementById("input-beta").classList.add("red-border");

            showError("Пожалуйста, введите входные данные.")
            return;
        }
        else if (validateInput(aValue) || validateInput(bValue) || validateInput(alphaValue) || validateInput(betaValue)) {
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

            if (validateInput(betaValue)) {
                document.getElementById("input-beta").classList.add("red-border");
                document.getElementById("input-beta").value = "";
            }

            showError("Пожалуйста, проверьте корректность введеных данных.")
            return;
        }

        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
        alphaValue = parseFloat(alphaValue);
        betaValue = parseFloat(betaValue);

        let hasInput = false;
        clearOutput();

        if (document.getElementById("output-s").checked) {
            let square = getSquareByMode1(aValue, bValue, alphaValue, betaValue);
            if(isNaN(square))
                showOutput("Площадь:", "Невозможно посчитать", true);
            else
                showOutput("Площадь:", square.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-a").checked) {
            let angleBetweenDiagonals = getAngleBetweenDiagonalsByMode1(aValue, bValue, alphaValue, betaValue);
            if(isNaN(angleBetweenDiagonals))
                showOutput("Угол между диагоналями:", "Невозможно посчитать", true);
            else
                showOutput("Угол между диагоналями:", angleBetweenDiagonals.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-d").checked) {
            let diagonals = getDiagonalsByMode1(aValue, bValue, alphaValue, betaValue);
            let d1 = diagonals[0];
            let d2 = diagonals[1];

            if(isNaN(d1))
                showOutput("Диагональ 1:", "Невозможно посчитать", true);
            else
                showOutput("Диагональ 1:", d1.toFixed(2));

            if(isNaN(d2))
                showOutput("Диагональ 2:", "Невозможно посчитать", true);
            else
                showOutput("Диагональ 2:", d2.toFixed(2));

            hasInput = true;
        }

        if (document.getElementById("output-p").checked) {
            let perimeter = getPerimeterByMode1(aValue, bValue, alphaValue, betaValue);
            if(isNaN(perimeter))
                showOutput("Периметр:", "Невозможно посчитать", true);
            else
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
        clearOutput();

        if (document.getElementById("output-s").checked) {
            let square = getSquareByMode2(aValue, bValue, cValue, dValue);
            if(isNaN(square))
                showOutput("Площадь:", "Невозможно посчитать", true);
            else
                showOutput("Площадь:", square.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-a").checked) {
            let angleBetweenDiagonals = getAngleBetweenDiagonalsByMode2(aValue, bValue, cValue, dValue);
            if(isNaN(angleBetweenDiagonals))
                showOutput("Угол между диагоналями:", "Невозможно посчитать", true);
            else
                showOutput("Угол между диагоналями:", angleBetweenDiagonals.toFixed(2));
            hasInput = true;
        }

        if (document.getElementById("output-d").checked) {
            let diagonals = getDiagonalsByMode2(aValue, bValue, cValue, dValue);
            let d1 = diagonals[0];
            let d2 = diagonals[1];

            if(isNaN(d1))
                showOutput("Диагональ 1:", "Невозможно посчитать", true);
            else
                showOutput("Диагональ 1:", d1.toFixed(2));

            if(isNaN(d2))
                showOutput("Диагональ 2:", "Невозможно посчитать", true);
            else
                showOutput("Диагональ 2:", d2.toFixed(2));

            hasInput = true;
        }

        if (document.getElementById("output-p").checked) {
            let perimeter = getPerimeterByMode2(aValue, bValue, cValue, dValue);
            if(isNaN(perimeter))
                showOutput("Периметр:", "Невозможно посчитать", true);
            else
                showOutput("Периметр:", perimeter.toFixed(2));
            hasInput = true;
        }

        if (!hasInput) {
            showError("Пожалуйста, выберите выходные данные.");
            highlightOutputCheckboxes();
        }
    }
}

document.getElementById("mode-1").addEventListener("click", showInputs.bind(null, 1));
document.getElementById("mode-2").addEventListener("click", showInputs.bind(null, 2));
document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("error-close").addEventListener("click", hideError);
document.getElementById("output-s").addEventListener("click", removeHighlightingOutputCheckboxes);
document.getElementById("output-s").addEventListener("click", clearOutput);
document.getElementById("output-a").addEventListener("click", removeHighlightingOutputCheckboxes);
document.getElementById("output-a").addEventListener("click", clearOutput);
document.getElementById("output-d").addEventListener("click", removeHighlightingOutputCheckboxes);
document.getElementById("output-d").addEventListener("click", clearOutput);
document.getElementById("output-p").addEventListener("click", removeHighlightingOutputCheckboxes);
document.getElementById("output-p").addEventListener("click", clearOutput);
showMode1();