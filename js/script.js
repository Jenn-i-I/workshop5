const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");
const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

// Exercises 1 and 3 / Harjoitukset 1 ja 3
animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = animalName.value.trim();
    const species = animalSpecies.value.trim();
    const note = careNote.value.trim();

    console.log(name);
    console.log(species);
    console.log(note);

    if (name.trim() === "") {
        nameError.textContent = "Nimi puuttuu.";
        animalName.classList.add("invalid");
        return;
    } else {
        animalName.classList.remove("invalid");
        nameError.textContent = "";
    };

    if (species.trim() === "") {
        speciesError.textContent = "Laji puuttuu.";
        animalSpecies.classList.add("invalid");
        return;
    } else {
        animalSpecies.classList.remove("invalid");
        speciesError.textContent ="";
    };

    if (note.trim().length > 150 || note.trim() === "") {
        noteError.textContent = "Hoitomuistion pituus tulee olla 1-150 merkkiä.";
        careNote.classList.add("invalid");
        return;
    } else {
        careNote.classList.remove("invalid");
        noteError.textContent = "";
    };

    formResult.textContent = "Eläimen nimi on " + name + ", sen laji on " + species + " ja sen hoitomuistiossa lukee " + note +".";

    const animal = {
        name,
        species,
        note
    };

    localStorage.setItem("ws05Animal", JSON.stringify(animal));

    const savedData = localStorage.getItem("ws05Animal");

});

// Exercise 2 / Harjoitus 2
const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const hinta = Number(animalType.value);
    const aika = yearsInput.value;
    const summa = hinta * aika;

    if (aika > 0 && aika < 3) {
        cost.textContent = "Kokonaishinta on " + summa + " euroa.";
    };

    if (aika > 1 && aika < 5) {
        cost.textContent = "Kokonaishinta on " + (summa * 0.8).toFixed(2) + " euroa.";
        discountMessage.textContent = "Sait 20 % alennuksen.";
    };

    if (aika > 4) {
        cost.textContent = "Kokonaishinta on " + (summa * 0.8 - 5).toFixed(2) + " euroa."
        discountMessage.textContent = "Sait paljousalennusta 20 % sekä 5 euron lisäalennuksen."
    };

});

// Exercise 4 / Harjoitus 4
const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");

function loadAnimal() {

    const savedData = localStorage.getItem("ws05Animal");
    let loadedAnimals = [];

    if (savedData !== null) {
        loadedAnimals = JSON.parse(savedData);
    } else {
        savedAnimal.textContent = "Ei vielä tallennettua eläintä.";
        return;
    };

    console.log(loadedAnimals);

    savedAnimal.textContent = `Nimi: ${loadedAnimals.name}, Laji: ${loadedAnimals.species}, Muistio: ${loadedAnimals.note}`;

};

loadButton.addEventListener("click", loadAnimal);

clearButton.addEventListener("click", function () {
    localStorage.removeItem("ws05Animal");
    savedAnimal.textContent = "";

});

loadAnimal();


