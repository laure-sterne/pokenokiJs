const url = 'https://pokeapi-enoki.netlify.app/pokeapi.json';

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

let pokenokiData = null;

async function init() {
  pokenokiData = await getAllPokenoki();
  console.log('pokenokiData', pokenokiData);

  getRightPokemonImage(pokenokiData);
  console.log('pokenokiData after image update', pokenokiData);

  displayPokenokiCard();

  // document.getElementById('centerPokemonCard').addEventListener('click', choosePokemon);
  // document.getElementById('start').addEventListener('click', changePokemon);
  // document.getElementById('stop').addEventListener('click', stopPokemon);
}

init();

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
  console.log('I am the pokemon to display', pokemon);

  document.getElementById('randomPokemonCard').style.backgroundColor =
    pokemon.background_color;
  document.getElementById('pokemonName').textContent = pokemon.name;
  document.getElementById('pokemonLevel').textContent =
    'lvl ' + pokemon.level + ' ' + pokemon.abilities[0].icon;

  let pokemonImage = '';
  pokemonImage +=
    "<img id='pokemonImageBackground' src='images/cardBackground.jpg' alt='background of the pokemon card' />";
  pokemonImage +=
    "<img id='pokemonFigure' src=" +
    pokemon.image +
    ' alt=' +
    pokemon.name +
    '>';
  document.getElementById('pokemonImage').innerHTML = pokemonImage;

  const pokemonAbilities = pokemon.abilities;
  let allAbilities = '';

  for (const element of pokemonAbilities) {
    allAbilities += '<div>';
    allAbilities += '<h3>' + element.icon + ' ' + element.name + '</h3>';
    allAbilities += '<h3>' + element.power + '</h3>';
    allAbilities += '</div>';
    allAbilities += '<p>' + element.description + '</p>';
  }

  document.getElementById('pokemonAbilities').innerHTML = allAbilities;
}

// function addPokenokiCard(changement) {
//   let addedPokemon = document.getElementById('allPokemons');

//   const index = pokenokiList.pokemons.indexOf(addedPokemon);

//   console.log('I am added pokemon', addedPokemon);

//   let clonePokemon = addedPokemon.cloneNode(true);
//   clonePokemon.removeAttribute('id');
//   clonePokemon.classList.add('choosenPokemon');

//   let children = clonePokemon.childNodes;

//   for (const element of children) {
//     element.id = index;
//   }

//   console.log('I am the clone', clonePokemon);
//   changement.appendChild(clonePokemon);

//   console.log('pokemons in addCard', pokemons);

//   if (index > -1) {
//     pokemons.splice(index, 1); // 2nd parameter means remove one item only
//   }

//   console.log('pokemons - pokemon :', pokemons);
// }

// function choosePokemon() {
//   console.log("I'm in choosePokemon");
//   console.log('I am pokemons in choosePokemon()', pokenokiList);

//   for (
//     let i = 0;
//     i < document.getElementsByClassName('borderPokemonCard').length;
//     i++
//   ) {
//     let cardId =
//       document.getElementsByClassName('borderPokemonCard')[i].childNodes[1];

//     if (cardId.childNodes.length == 0) {
//       console.log("I am empty, I'll fill it with the choosen Pokemon Card!");
//       addPokenokiCard(cardId);
//       displayRandomPokenoki();
//       return;
//     } else if (cardId.childNodes.length == 1 && i == 5) {
//       alert('You have your complete Pokemon deck!');
//     } else {
//       console.log('I am full in index', i, "I'll go on next index");
//     }
//   }

//   console.log('I am pokemons after choosen card', pokenokiList);
// }

// let counter = 15;
// let timer;

// function changePokemon() {
//   console.log('I start the count');
//   console.log('pokemons in changePokemon()', pokenokiList);

//   timer = setInterval(function () {
//     console.log('I am in setInterval');

//     counter -= 1;

//     displayRandomPokemon();

//     document.getElementById('stop').innerText = 'Stop (' + counter + ' sec)';

//     if (counter == 0) {
//       stopPokemon();
//     }
//   }, 1000);
// }

// function stopPokemon() {
//   clearInterval(timer);
//   document.getElementById('stop').innerText = 'Stop';
//   counter = 15;
//   console.log('I stopped');
// }
