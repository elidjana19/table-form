const table = document.querySelector("table");
const addBtn = document.getElementById("add");

const people = [
  {
    name: "Ana",
    lastname: "Smith",
    age: 30,
    startDateSubscription: "2022-06-20",
    endDateSubscription: "2023-08-20",
    status: true,
    pay: 800,
    cardType: "Visa",
  },
  {
    name: "Bob",
    lastname: "Smith",
    age: 19,
    startDateSubscription: "2021-05-28",
    endDateSubscription: "2023-08-20",
    status: true,
    pay: 600,
    cardType: "Mastercard",
  },
  {
    name: "Miri",
    lastname: "Leku",
    age: 60,
    startDateSubscription: "2020-06-06",
    endDateSubscription: "2023-08-20",
    status: false,
    pay: 500,
    cardType: "Visa",
  },
  {
    name: "Maria",
    lastname: "Topi",
    age: 23,
    startDateSubscription: "2022-06-20",
    endDateSubscription: "2023-08-20",
    status: true,
    pay: 400,
    cardType: "Visa",
  },
  {
    name: "Besi",
    lastname: "Jul",
    age: 31,
    startDateSubscription: "2024-03-20",
    endDateSubscription: "2023-08-29",
    status: false,
    pay: 100,
    cardType: "PayPal",
  },
];

function showData() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  people.forEach((person, index) => {
    const row = tbody.insertRow();
    row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.lastname}</td>
            <td>${person.age}</td>
            <td>${person.startDateSubscription}</td>
            <td>${person.endDateSubscription}</td>
            <td>${person.status ? "Yes" : "No"}</td>
            <td>${person.pay}</td>
            <td>${person.cardType}</td>
            <td>
                <button onclick="editPerson(${index})">Edit</button>
                <button onclick="deletePerson(${index})">Delete</button>
            </td>
        `;
  });
  table.appendChild(tbody);
}

showData();

const dialog = document.querySelector("dialog");
const submit = document.getElementById("submit");

addBtn.addEventListener("click", () => {
  clearForm();
  openDialog();
  submit.onclick = addData;
});
document.getElementById("close").addEventListener("click", closeDialog);

function openDialog() {
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
  clearForm();
}

function addData() {
  const name = document.getElementById("name").value;
  const lastname = document.getElementById("lastname").value;
  const age = document.getElementById("age").value;
  const startDateSubscription = document.getElementById(
    "startDateSubscription"
  ).value;
  const endDateSubscription = document.getElementById(
    "endDateSubscription"
  ).value;
  const status = document.querySelector('input[name="status"]:checked')
    ? document.querySelector('input[name="status"]:checked').value === "true"
    : false;
  const pay = document.getElementById("pay").value;
  const cardType = document.querySelector('input[name="cardType"]:checked')
    ? document.querySelector('input[name="cardType"]:checked').value
    : "";

  if (
    !name ||
    !lastname ||
    !age ||
    !startDateSubscription ||
    !endDateSubscription ||
    !pay ||
    !cardType
  ) {
    alert("Please fill in all fields.");
    return;
  }

  const newPerson = {
    name,
    lastname,
    age,
    startDateSubscription,
    endDateSubscription,
    status,
    pay,
    cardType,
  };
  console.log(newPerson);

  people.push(newPerson);
  showData();
  closeDialog();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("age").value = "";
  document.getElementById("startDateSubscription").value = "";
  document.getElementById("endDateSubscription").value = "";
  document.querySelectorAll('input[name="status"]').forEach((radio) => {
    radio.checked = false;
  });
  document.getElementById("pay").value = "";
  document.querySelectorAll('input[name="cardType"]').forEach((radio) => {
    radio.checked = false;
  });
}

function deletePerson(index) {
  people.splice(index, 1);
  showData();
}

function editPerson(index) {
  const personData = people[index];
  fillForm(personData);
  openDialog();

  submit.onclick = () => {
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const age = document.getElementById("age").value;
    const startDateSubscription = document.getElementById(
      "startDateSubscription"
    ).value;
    const endDateSubscription = document.getElementById(
      "endDateSubscription"
    ).value;
    const status = document.querySelector('input[name="status"]:checked')
      ? document.querySelector('input[name="status"]:checked').value === "true"
      : false;
    const pay = document.getElementById("pay").value;
    const cardType = document.querySelector('input[name="cardType"]:checked')
      ? document.querySelector('input[name="cardType"]:checked').value
      : "";

    const updated = {
      name,
      lastname,
      age,
      startDateSubscription,
      endDateSubscription,
      status,
      pay,
      cardType,
    };

    people[index] = updated;
    showData();
    closeDialog();
  };
}

function fillForm(personData) {
  document.getElementById("name").value = personData.name;
  document.getElementById("lastname").value = personData.lastname;
  document.getElementById("age").value = personData.age;
  document.getElementById("startDateSubscription").value =
    personData.startDateSubscription;
  document.getElementById("endDateSubscription").value =
    personData.endDateSubscription;
  document.getElementById("statusTrue").checked = personData.status === true;
  document.getElementById("statusFalse").checked = personData.status === false;
  document.getElementById("pay").value = personData.pay;
  document.getElementById("visa").checked = personData.cardType === "Visa";
  document.getElementById("mastercard").checked =
    personData.cardType === "Mastercard";
  document.getElementById("paypal").checked = personData.cardType === "PayPal";
}
