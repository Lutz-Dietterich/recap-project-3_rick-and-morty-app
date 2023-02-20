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
let page = 2;
let searchQuery = "";
let maxPage;
fetchData();

nextButton.addEventListener("click", () => {
  page++;
  cardContainer.innerHTML = "";
  if (page > maxPage) {
    page = 1;
  }

  if (searchQuery) {
    fetchDataTwo(searchQuery);
  } else {
    fetchData();
  }
});

prevButton.addEventListener("click", () => {
  page--;
  cardContainer.innerHTML = "";
  if (page < 1) {
    page = maxPage;
  }
  if (searchQuery) {
    fetchDataTwo(searchQuery);
  } else {
    fetchData();
  }
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
  maxPage = characters.info.pages;

  pagination.textContent = `${page}/${maxPage}`;
}

//search function

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  searchQuery = data.query;
  cardContainer.innerHTML = "";
  page = 1;
  fetchDataTwo(searchQuery);
});

async function fetchDataTwo(search) {
  const data = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`
  );
  const characters = await data.json();

  characters.results.forEach((character) => {
    const newCard = createCharacterCard(character);
    cardContainer.append(newCard);
  });
  maxPage = characters.info.pages;

  pagination.textContent = `${page}/${maxPage}`;
}
