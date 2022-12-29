function init() {
  let arrayFromLocalStorage = JSON.parse(localStorage.getItem("data"));

  // Remove below lines while working
  if (arrayFromLocalStorage == null) {
    arrayFromLocalStorage = [
      // {
      //     id: generateUUID(),
      //     num1: 1,
      //     num2: 2,
      //     total: 3
      // }
    ];
  }

  bindDataToTable(arrayFromLocalStorage);
}

// Call this function on page load
init();

// Sum Function called on button click event
function Sum() {
  if (isEdit) {
    console.log("came in isEdit");

    var arrayFromLocalStorage = JSON.parse(localStorage.getItem("data"));
    console.log(arrayFromLocalStorage);

    //find the uid for row updated



  } else {
    //console.log("came in isEdit - false")
    var formData = readSumFormData();
    let totalNumber = document.getElementById("total");

    num1 = formData.num1;
    num2 = formData.num2;
    total = num1 + num2;

    totalNumber.innerText = `Total: ${total}`;
    //   totalNumber.innerText = `Total: ${formData.num1 + formData.num2}`;

    setTimeout(() => {
      totalNumber.innerText = `Total:`;
    }, 5000);

    //Reset input fields
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";

    sendDatatoLocalStorage(num1, num2, total);

    //Append data to html table

    createNewRowandAppendtotable(num1, num2, total, generateUUID());
  }
}

function createNewRowandAppendtotable(
  firstNumber,
  secondNumber,
  totalValue,
  rowListID
) {
  let table = document.getElementById("table");

  var row = document.createElement("tr");
  let firstInputNumber = document.createElement("td");
  let secondInputNumber = document.createElement("td");
  let totalAll = document.createElement("td");
  firstInputNumber.innerHTML = firstNumber;
  secondInputNumber.innerHTML = secondNumber;
  totalAll.innerHTML = totalValue;

  let actionButtons = document.createElement("td");

  let btn = `<button class='btn btn-primary' onclick='editInputData("${rowListID}")'>Edit</button><button class='btn btn-danger' onclick='deleteRow("${rowListID}")'>Delete</button>`;

  actionButtons.innerHTML = btn;
  row.append(firstInputNumber, secondInputNumber, totalAll, actionButtons);
  table.appendChild(row);

  row.setAttribute("id", rowListID);
}

function readSumFormData() {
  let num1 = parseInt(document.getElementById("num1").value);
  let num2 = parseInt(document.getElementById("num2").value);

  return {
    num1,
    num2,
  };
}

function bindDataToTable(tableRows) {
  let table = document.getElementById("table");

  for (let counter = 0; counter < tableRows.length; counter++) {
    createNewRowandAppendtotable(
      tableRows[counter].num1,
      tableRows[counter].num2,
      tableRows[counter].total,
      tableRows[counter].uid
    );
  }
}

//Send input data to local storage
function sendDatatoLocalStorage(num1, num2, total) {
  //read data from localstorage
  var arrayFromLocalStorage = JSON.parse(localStorage.getItem("data"));

  //prepare a new row for localstorage
  if (arrayFromLocalStorage === null) {
    arrayFromLocalStorage = [];
  } else {
    let allData = {
      uid: generateUUID(),
      num1,
      num2,
      total,
    };

    //append data to localstorage object
    arrayFromLocalStorage.push(allData);

    //update data in localstorage
    localStorage.setItem("data", JSON.stringify(arrayFromLocalStorage));
  }
}

//Delete Row data by id
function deleteRow(rowId) {
  //remove from page [html table]
  document.getElementById(rowId).remove();

  //Take Array from Localstorage
  var arrayFromLocalStorage = JSON.parse(localStorage.getItem("data"));
  //Find the object with id and delete the array (object)

  for (counter = 0; counter < arrayFromLocalStorage.length; counter++) {
    var obj = arrayFromLocalStorage[counter];

    if (arrayFromLocalStorage[counter].uid === rowId) {
      arrayFromLocalStorage.splice(counter, 1);
      break;
    }
  }

  //Re send the array to localstorage
  localStorage.setItem("data", JSON.stringify(arrayFromLocalStorage));
}

var globalRowId = "";
var isEdit = false;

function editInputData(rowId) {
  console.log("edit-click");
  //Take the uid and read the localstorage data
  var arrayFromLocalStorage = JSON.parse(localStorage.getItem("data"));

  arrayFromLocalStorage = arrayFromLocalStorage.filter(
    (obj) => obj.uid === rowId
  );

  console.log("Edit Array:", arrayFromLocalStorage);

  let editNum1 = arrayFromLocalStorage[0].num1;
  let editNum2 = arrayFromLocalStorage[0].num2;

  console.log("edit number 1:", editNum1);
  console.log("edit number 2:", editNum2);

  //Push it to the input fields (html table)
  document.getElementById("num1").value = editNum1;
  document.getElementById("num2").value = editNum2;

  isEdit = true;
}

// Utility functions---------------------------------
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
