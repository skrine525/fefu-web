let doFiltering = false;
let doSorting = false;

const sortingFields = [
    {name: "dish", label: "Блюдо"},
    {name: "calories", label: "Калорийность"},
    {name: "weight", label: "Масса"},
    {name: "price", label: "Цена"},
    {name: "type", label: "Тип блюда"}
];

function compareValues(value1, value2, order) {
    let result = 0;

    if (value1 > value2)
        result = -1;
    else if(value1 < value2)
        result = 1;

    if (order == "desc")
        return result;
    else if(order == "asc")
        return -result;
}

function updateTypes() {
    let types = [];

    menu.forEach((item) => {
        if (!types.includes(item.type)) {
            types.push(item.type);
        }
    });

    let select = document.getElementById("filter-type");
    select.innerHTML = "";
    let nullOption = document.createElement("option")
    select.append(nullOption);
    nullOption.innerText = "--не выбрано--";
    nullOption.value = "";

    types.forEach((item) => {
        let typeOption = document.createElement("option");
        select.append(typeOption);
        typeOption.innerText = item;
        typeOption.value = item;
    });
}

function filterData(data) {
    let filterDish = document.getElementById("filter-dish").value.toLowerCase();
    let filterCalFrom = parseFloat(document.getElementById("filter-cal-from").value);
    let filterCalTo = parseFloat(document.getElementById("filter-cal-to").value);
    let filterWeightFrom = parseFloat(document.getElementById("filter-weight-from").value);
    let filterWeightlTo = parseFloat(document.getElementById("filter-weight-to").value);
    let filterPricetFrom = parseFloat(document.getElementById("filter-price-from").value);
    let filterPricelTo = parseFloat(document.getElementById("filter-price-to").value);
    let filterType = document.getElementById("filter-type").value;

    let newData = [];

    data.forEach((item) => {
        // Фильтр по блюду
        if (filterDish !== "" && item.dish.toLowerCase().indexOf(filterDish) === -1)
            return;

        // Фильтр по калорийности ОТ
        if(!isNaN(filterCalFrom) && item.calories < filterCalFrom)
            return;

        // Фильтр по калорийности ДО
        if(!isNaN(filterCalTo) && item.calories > filterCalTo)
            return;

        // Фильтр по массе ОТ
        if(!isNaN(filterWeightFrom) && item.weight < filterWeightFrom)
            return;

        // Фильтр по массе ДО
        if(!isNaN(filterWeightlTo) && item.weight > filterWeightlTo)
            return;

        // Фильтр по цене ОТ
        if(!isNaN(filterPricetFrom) && item.price < filterPricetFrom)
            return;

        // Фильтр по цене ДО
        if(!isNaN(filterPricelTo) && item.price > filterPricelTo)
            return;

        // Фильтр по типу
        if (filterType !== "" && item.type.indexOf(filterType) === -1)
            return;

        newData.push(item);
    });

    return newData;
}

function sortData(data) {
    let field1 = document.getElementById("sort-level1-field").value;
    let field2 = document.getElementById("sort-level2-field").value;
    let field3 = document.getElementById("sort-level3-field").value;
    let order1 = document.getElementById("sort-level1-order").value;
    let order2 = document.getElementById("sort-level2-order").value;
    let order3 = document.getElementById("sort-level3-order").value;
    
    if(field1) {
        data.sort((a, b) => {
            let cmp = compareValues(a[field1], b[field1], order1);
            if (cmp !== 0)
                return cmp;
    
            if (field2) {
                cmp = compareValues(a[field2], b[field2], order2);
                if (cmp !== 0)
                    return cmp;
            }
    
            if (field3)
                return compareValues(a[field3], b[field3], order3);
    
            return 0;
        });
    }
}

function showTable() {
    let data = structuredClone(menu);

    if(doFiltering)
        data = filterData(data);

    if(doSorting)
        sortData(data);

    let tbodyElement = document.getElementById("table-content");
    tbodyElement.innerHTML = "";

    data.forEach((item) => {
        let tr = document.createElement("tr");
        tbodyElement.append(tr);

        let tdDish = document.createElement("td");
        tr.append(tdDish);
        tdDish.innerText = item.dish;

        let tdCal = document.createElement("td");
        tr.append(tdCal);
        tdCal.innerText = item.calories;

        let tdWeight = document.createElement("td");
        tr.append(tdWeight);
        tdWeight.innerText = item.weight;

        let tdPrice = document.createElement("td");
        tr.append(tdPrice);
        tdPrice.innerText = item.price;

        let tdType = document.createElement("td");
        tr.append(tdType);
        tdType.innerText = item.type;
    });
}

function applyFilter() {
    doFiltering = true;
    showTable();
}

function clearFilter() {
    document.getElementById("filter-dish").value = '';
    document.getElementById("filter-cal-from").value = '';
    document.getElementById("filter-cal-to").value = '';
    document.getElementById("filter-weight-from").value = '';
    document.getElementById("filter-weight-to").value = '';
    document.getElementById("filter-price-from").value = '';
    document.getElementById("filter-price-to").value = '';
    document.getElementById("filter-type").value = '';

    doFiltering = false;
    showTable();
}

function prepareSorting() {
    let select = document.getElementById("sort-level1-field");
    select.innerHTML = "";
    let nullOption = document.createElement("option")
    select.append(nullOption);
    nullOption.innerText = "--не выбрано--";
    nullOption.value = "";

    sortingFields.forEach((item) => {
        let typeOption = document.createElement("option");
        select.append(typeOption);
        typeOption.innerText = item.label;
        typeOption.value = item.name;
    });

    document.getElementById("sort-level1-order").selectedIndex = 0;
    document.getElementById("sort-level2-field").disabled = true;
    document.getElementById("sort-level2-field").innerHTML = "";
    document.getElementById("sort-level2-order").disabled = true;
    document.getElementById("sort-level2-order").selectedIndex = 0;
    document.getElementById("sort-level3-field").disabled = true;
    document.getElementById("sort-level3-field").innerHTML = "";
    document.getElementById("sort-level3-order").disabled = true;
    document.getElementById("sort-level3-order").selectedIndex = 0;
}

function changeSortLevel1() {
    let field1 = document.getElementById("sort-level1-field").value;

    document.getElementById("sort-level2-order").selectedIndex = 0;

    document.getElementById("sort-level3-field").disabled = true;
    document.getElementById("sort-level3-field").innerHTML = "";
    document.getElementById("sort-level3-order").disabled = true;

    if (field1 === "") {
        document.getElementById("sort-level2-field").disabled = true;
        document.getElementById("sort-level2-field").innerHTML = "";
        document.getElementById("sort-level2-order").disabled = true;
    }
    else {
        document.getElementById("sort-level2-field").disabled = false;
        document.getElementById("sort-level2-order").disabled = false;

        let select = document.getElementById("sort-level2-field");
        select.innerHTML = "";
        let nullOption = document.createElement("option")
        select.append(nullOption);
        nullOption.innerText = "--не выбрано--";
        nullOption.value = "";

        sortingFields.forEach((item) => {
            if (item.name !== field1) {
                let typeOption = document.createElement("option");
                select.append(typeOption);
                typeOption.innerText = item.label;
                typeOption.value = item.name;
            }
        });
    }
}

function changeSortLevel2() {
    let field1 = document.getElementById("sort-level1-field").value;
    let field2 = document.getElementById("sort-level2-field").value;

    document.getElementById("sort-level3-order").selectedIndex = 0;

    if (field2 === "") {
        document.getElementById("sort-level3-field").disabled = true;
        document.getElementById("sort-level3-field").innerHTML = "";
        document.getElementById("sort-level3-order").disabled = true;
    }
    else {
        document.getElementById("sort-level3-field").disabled = false;
        document.getElementById("sort-level3-order").disabled = false;

        let select = document.getElementById("sort-level3-field");
        select.innerHTML = "";
        let nullOption = document.createElement("option")
        select.append(nullOption);
        nullOption.innerText = "--не выбрано--";
        nullOption.value = "";

        sortingFields.forEach((item) => {
            if (item.name !== field1 && item.name !== field2) {
                let typeOption = document.createElement("option");
                select.append(typeOption);
                typeOption.innerText = item.label;
                typeOption.value = item.name;
            }
        });
    }
}

function applySort() {
    doSorting = true;
    showTable();
}

function clearSort() {
    prepareSorting()
    doSorting = false;
    showTable();
}

document.getElementById("apply-filter").addEventListener("click", applyFilter);
document.getElementById("clear-filter").addEventListener("click", clearFilter);
document.getElementById("apply-sort").addEventListener("click", applySort);
document.getElementById("clear-sort").addEventListener("click", clearSort);
document.getElementById("sort-level1-field").addEventListener("change", changeSortLevel1);
document.getElementById("sort-level2-field").addEventListener("change", changeSortLevel2);

updateTypes();
prepareSorting();
showTable();