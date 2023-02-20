import { createCharacterCard } from "./components/card/card.js";
const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let page = 5;
const searchQuery = "";
fetchData();

nextButton.addEventListener("click", () => {
  page++;
  console.log(page);
  cardContainer.innerHTML = "";
  fetchData();
});

prevButton.addEventListener("click", () => {
  page--;
  console.log(page);
  cardContainer.innerHTML = "";
  fetchData();
});

async function fetchData() {
  const data = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const characters = await data.json();

  characters.results.forEach((character) => {
    const newCard = createCharacterCard(character);
    cardContainer.append(newCard);
  });

  const maxPage = characters.info.pages;
  console.log(maxPage);

  pagination.textContent = `${page}/${maxPage}`;
}
