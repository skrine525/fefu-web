function drawTable(n) {
    if(isNaN(parseFloat(n)) || !isFinite(n) || n <= 0)
    {
        document.write("Неверный ввод: " + n);
    }
    else
    {
        n = parseInt(n);
        let currentClass;

        document.write("<table>");
        for (let i = 0; i < n; i++) {
            currentClass = i % 2 == 0 ? "cell-selected" : "cell-empty";

            document.write("<tr>");
            for (let j = 0; j < n; j++) {
                document.write(`<th class="${currentClass}"> </th>`);

                if(j % 2 == 1)
                {
                    currentClass = currentClass == "cell-selected" ? "cell-empty" : "cell-selected";
                }
            }        
        }
        document.write("</table>");
    }
}

let n = prompt("n =");

drawTable(n);