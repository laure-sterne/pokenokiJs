const url = 'https://pokeapi-enoki.netlify.app/pokeapi.json';
let pokenokiData = null;
let currentPokemon = null;
let counter = 15;
let timer = null;

async function init() {
  pokenokiData = await getAllPokenoki();
  console.log('pokenokiData', pokenokiData);

  getRightPokemonImage(pokenokiData);
  console.log('pokenokiData after image update', pokenokiData);

  displayPokenokiCard();

  document.getElementById('centerPokemonCard').addEventListener('click', addPokenokiCard);
  document.getElementById('start').addEventListener('click', startCountdown);
  document.getElementById('stop').addEventListener('click', stopCountdown);
}

init();


async function getAllPokenoki() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du fetch :', error);
  }
}

function startCountdown() {
  if (!timer) { 
    timer = setInterval(function () {
      counter -= 1;
      displayPokenokiCard();
      document.getElementById('stop').innerText = 'Stop (' + counter + ' sec)';

      if (counter == 0) {
        stopCountdown();
      }
    }, 1000);
  }
}

function stopCountdown() {
  clearInterval(timer);
  timer = null;
  document.getElementById('stop').innerText = 'Stop';
  counter = 15;
}

function getRightPokemonImage(pokenokiList) {
  for (const pokemon of pokenokiList.pokemons) {
    switch (pokemon.id) {
      case 1:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png';
        continue;

      case 2:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png';
        continue;

      case 3:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png';
        continue;

      case 4:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/399.png';
        continue;

      case 5:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png';
        continue;

      case 6:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
        continue;

      case 7:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png';
        continue;

      case 8:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/398.png';
        continue;

      case 9:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png';
        continue;

      case 10:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/470.png';
        continue;

      case 11:
        pokemon.image =
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/873.png';
        continue;

      default:
        console.log('Sorry, I cannot change url image of pokemon figure...');
        continue;
    }
  }

  return pokenokiList;
}

function getRandomPokenoki() {
  let pokemonsList = pokenokiData.pokemons;
  let pokemon = pokemonsList[Math.floor(Math.random() * pokemonsList.length)];

  return pokemon;
}

function displayPokenokiCard() {
  let pokemon = getRandomPokenoki();
  currentPokemon = pokemon;

  document.getElementById('centerPokemonCard').style.backgroundColor = pokemon.background_color;
  document.getElementById('centerPokemonCard').getElementsByClassName('pokemonName')[0].textContent = pokemon.name;
  document.getElementById('centerPokemonCard').getElementsByClassName('pokemonLevel')[0].innerHTML = '<span>Nv</span> ' + pokemon.level + ' ' + pokemon.abilities[0].icon;

  let pokemonImage = '';
  pokemonImage += "<img class='pokemonImageBackground' src='images/cardBackground.jpg' alt='background of the pokemon card' />";
  pokemonImage += "<img class='pokemonFigure' src=" + pokemon.image + ' alt=' + pokemon.name + '>';
  document.getElementById('centerPokemonCard').getElementsByClassName('pokemonImage')[0].innerHTML = pokemonImage;

  const pokemonAbilities = pokemon.abilities;
  let allAbilities = '';
  for (const element of pokemonAbilities) {
    allAbilities += '<div>';
    allAbilities += '<h3>' + element.icon + ' ' + element.name.charAt(0).toUpperCase() + element.name.slice(1) + '</h3>';
    allAbilities += '<h3>' + element.power + '</h3>';
    allAbilities += '</div>';
    allAbilities += '<p>' + element.description + '</p>';
  }
  document.getElementById('centerPokemonCard').getElementsByClassName('pokemonAbilities')[0].innerHTML = allAbilities;
}

function addPokenokiCard() {
  const deckSlots = [
    'firstPokemonCard',
    'secondPokemonCard',
    'thirdPokemonCard',
    'fourthPokemonCard',
    'fifthPokemonCard',
    'sixthPokemonCard'
  ];

  const emptySlot = deckSlots
    .map(id => document.getElementById(id))
    .find(slot => slot.innerHTML.trim() === '');

  if (! emptySlot) {
    alert('Your deck is full!');
    return;
  }

  const centerCard = document.getElementById('centerPokemonCard');

  emptySlot.innerHTML = centerCard.innerHTML;
  emptySlot.style.backgroundColor = centerCard.style.backgroundColor;

  const scaleRatio = emptySlot.offsetWidth / centerCard.offsetWidth;
  const content = emptySlot.firstElementChild;

  if (content) {
    content.style.zoom = scaleRatio;
  }

  const index = pokenokiData.pokemons.indexOf(currentPokemon);
  pokenokiData.pokemons.splice(index, 1);
  
  console.log('pokenokiData after deletion of the pokemon figure', pokenokiData);
  console.log('currentPokemon', currentPokemon);
  
  displayPokenokiCard();
}