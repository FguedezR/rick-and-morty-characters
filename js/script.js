// ver que el endpoint funcina https://rickandmortyapi.com/api/character/?page=1
// traer elementos de endpoint y comprobarlos
// una vez que tengo elementos colocarlos en la página
// cuando tengo una de las páginas en mi web podré traer el resto
// capturar botones de páginas prev y next
// al pulsar prev page tiene que bajar una página -1. al pulsar next page tiene que subir una página +1
// hacer css
// que funcione todo
// PARKING LOT

const characterList = document.getElementById("character-list");
const prevPage      = document.getElementById("prev-page");
const nextPage      = document.getElementById("next-page");
let currentPage     = 1;

function getCharacters() {
  fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
    //primero parseamos
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al obtener los personajes: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const characters = data.results
        .map((character) => {
          const template = `
        <li>
            <img src="${character.image}" alt="${character.image}">
            <h2><strong>Nombre:</strong> ${character.name}</h2>
            <p><strong>Especie:</strong> ${character.species}</p>
        </li>
        `;
          return template;
        })
        .join("");
      characterList.innerHTML = characters;
      removeButton();
    })
    .catch((err) => console.log(err));
}

// remover boton prev y next
function removeButton() {
    currentPage  === 1  ? prevPage.classList.add('disabled') : prevPage.classList.remove('disabled');
    currentPage  === 42 ? nextPage.classList.add('disabled') : nextPage.classList.remove('disabled');
}

// capturar botones
prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    console.log("estamos en la página: ", currentPage);
    getCharacters();
  }
});

nextPage.addEventListener("click", () => {
  if (currentPage < 42) {
    currentPage++;
    console.log("estamos en la página: ", currentPage);
    getCharacters();
  }
});

getCharacters();