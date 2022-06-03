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

    // get a random pokemon
    const pokemon = pokemons[Math.floor(Math.random()*pokemons.length)];
    console.log("index 0 of pokemons", pokemons[0])
    const pokemonDisplay = document.getElementById("allPokemons");

    // const backgroundColor 
    document.getElementById("allPokemons").style.backgroundColor = pokemon.background_color;
    
    // add name, level and icon
    const pokemonName = pokemon.name;
    const pokemonLevel = pokemon.level;
    const pokemonIcon = pokemon.abilities[0].icon
    document.getElementById("pokemonName").innerText = pokemonName;
    document.getElementById("pokemonLevel").innerText = "lvl" + pokemonLevel + " " + pokemonIcon;
    
    // add background image and pokemon
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    pokemonDisplay.appendChild(pokemonImage);
    document.body.querySelector("img").backgroundImage = "url('" + pokemon.image + "')";
    document.querySelector("img").setAttribute("alt", pokemon.name)
    
    // add pokemon abilities
    const pokemonAbilities = pokemon.abilities
    console.log("I have all pokemon abilities", pokemonAbilities)

    for (a = 0; a < pokemonAbilities.length; a++){
        console.log("I am a", a)
        console.log("get values of a", pokemonAbilities[a])

        const pokemonAbilitiesDisplay = document.getElementById("pokemonAbilities")
        const abilityInformation = document.createElement("div");
        abilityInformation.setAttribute("id", pokemonAbilities[a].name + " information")
        pokemonAbilitiesDisplay.appendChild(abilityInformation)

        const abilityName = document.createElement("h2");
        abilityName.setAttribute("id", pokemonAbilities[a].name)

        const abilityLevel = document.createElement("h2");
        abilityLevel.setAttribute("id", pokemonAbilities[a].power)

        const abilityDescription = document.createElement("p");
        abilityDescription.setAttribute("id", pokemonAbilities[a].name + " description");
        
        abilityInformation.appendChild(abilityName);
        abilityInformation.appendChild(abilityLevel);
        pokemonAbilitiesDisplay.appendChild(abilityDescription);

        document.getElementById(pokemonAbilities[a].name).innerText = pokemonAbilities[a].icon + " " + pokemonAbilities[a].name;
        document.getElementById(pokemonAbilities[a].power).innerText = pokemonAbilities[a].power;
        document.getElementById(pokemonAbilities[a].name + " description").innerText = pokemonAbilities[a].description;
    }
}