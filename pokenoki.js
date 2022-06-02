const url = 'https://pokeapi-enoki.netlify.app/pokeapi.json';

fetch(url)
    .then(function(response) { 
        return response.json()
    })
    
    .then(function(data) {
        console.log("le json est là : ", data)
        let pokemons = data.pokemons;
        randomPokemon(pokemons)
    })

    .catch(function(error) {
        console.log("there is an error",error);
    });

function randomPokemon(pokemons) {

    // get the first pokemon
    const pokemon = pokemons[0];
    console.log("index 0 of pokemons", pokemons[0])
    const pokemonDisplay = document.getElementById("allPokemons");
    
    // add name, level and icon
    const pokemonName = pokemon.name;
    const pokemonLevel = pokemon.level;
    const pokemonIcon = pokemon.abilities[0].icon
    const heading = document.createElement("h1");
    pokemonDisplay.appendChild(heading);
    document.querySelector("h1").innerText = pokemonName + " lvl" + pokemonLevel + pokemonIcon;
    
    // add background image and pokemon
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    pokemonDisplay.appendChild(pokemonImage);
    document.querySelector("pokemonImage").style.backgroundImage = "url('" + pokemon.image + "')";
    document.querySelector("pokemonImage").setAttribute(alt, pokemon.name)
    
    
}