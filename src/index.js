document.addEventListener("DOMContentLoaded", () => {
  function fetchDogs() {
    fetch("http://localhost:3000/dogs")
      .then((resp) => resp.json())
      .then((data) => data.forEach((dog) => renderDog(dog)));
  }
  function renderDog(dog) {
    const tableBody = document.querySelector("#table-body");
    const newRow = document.createElement("tr");
    const newNameData = document.createElement("td");
    const newBreedData = document.createElement("td");
    const newSexData = document.createElement("td");
    const newEditDogData = document.createElement("td");
    const editDogBttn = document.createElement("button");
    editDogBttn.innerText = "Edit Dog";
    tableBody.append(newRow);
    newRow.append(newNameData, newBreedData, newSexData, newEditDogData);
    newNameData.innerText = dog.name;
    newBreedData.innerText = dog.breed;
    newSexData.innerText = dog.sex;
    newEditDogData.append(editDogBttn);
    editDogBttn.addEventListener("click", function () {
      editDoge(dog);
    });
  }
  fetchDogs();
  function editDoge(dog) {
    const form = document.querySelector("#dog-form");
    const nameInput = document.querySelector("#dog-form").firstElementChild;
    const breedInput =
      document.querySelector("#dog-form").firstElementChild.nextElementSibling;
    const sexInput =
      document.querySelector("#dog-form").firstElementChild.nextElementSibling
        .nextElementSibling;
    nameInput.value = dog.name;
    breedInput.value = dog.breed;
    sexInput.value = dog.sex;
    const newDogObj = {};
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      newDogObj.id = dog.id;
      newDogObj.name = nameInput.value;
      newDogObj.breed = breedInput.value;
      newDogObj.sex = sexInput.value;
      fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDogObj),
      })
        .then((resp) => resp.json())
        .then((data) => data);
      fetch(`http://localhost:3000/dogs`)
        .then((resp) => resp.json())
        .then((data) => data.forEach((dog) => renderDog(dog)));

      form.reset();
    });
  }
});
