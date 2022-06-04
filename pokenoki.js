// set the url of the pokemon api
const url = 'https://pokeapi-enoki.netlify.app/pokeapi.json';

var pokemons;
console.log("I am global pokemons before", pokemons)

// call pokemon api
fetch(url)
    .then(function(response) {
        return response.json();
    })
    
    .then(function(data) {
        console.log("le json est là : ", data);
        pokemons = data.pokemons;
        console.log("la variable pokemons : ", pokemons);
        
        displayRandomPokemon();
    })

    .catch(function(error) {
        console.log("there is an error", error);
    });

console.log("I am global pokemons after", pokemons)


function displayRandomPokemon() {
    console.log("pokemons inside displayRandom", pokemons);

    // get a random pokemon
    var pokemon = pokemons[Math.floor(Math.random()*pokemons.length)];

    // console.log("index 0 of pokemons", pokemons[0])
    const pokemonDisplay = document.getElementById("pokemonImage");

    // const backgroundColor 
    document.getElementById("allPokemons").style.backgroundColor = pokemon.background_color;
    
    // add name, level and icon
    const pokemonName = pokemon.name;
    const pokemonLevel = pokemon.level;
    const pokemonIcon = pokemon.abilities[0].icon;
    document.getElementById("pokemonName").innerText = pokemonName;
    document.getElementById("pokemonLevel").innerText = "lvl" + pokemonLevel + " " + pokemonIcon;
    
    // add background image and pokemon
    const pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    pokemonDisplay.appendChild(pokemonImage);
    pokemonImage.setAttribute("id", "pokemonFigure");
    document.getElementById("pokemonFigure").setAttribute("alt", pokemon.name);
    document.getElementById("pokemonFigure").backgroundImage = "url('" + pokemon.image + "')";
    
    // add pokemon abilities
    const pokemonAbilities = pokemon.abilities;
    var allAbilities = "";

    for (a = 0; a < pokemonAbilities.length; a++){

        allAbilities += "<div>";
        allAbilities += "<h2>" + pokemonAbilities[a].icon + " " + pokemonAbilities[a].name + "</h2>";
        allAbilities += "<h2>" + pokemonAbilities[a].power + "</h2>";
        allAbilities += "</div>";
        allAbilities += "<p>" + pokemonAbilities[a].description +"</p>";
    };

    document.getElementById("pokemonAbilities").innerHTML = allAbilities;
};

// add card in our deck
function choosePokemon() {
    console.log("I'm in choosePokemon");
    console.log("I am pokemons", pokemons);

    // to be continued...
};

// start and stop the shuffle
var counter = 15;
var timer;

function changePokemon(){
    console.log("I start the count");
    console.log("pokemons", pokemons);

    timer = setInterval(function() {
        console.log("I am in setInterval");

        counter -= 1;
        displayRandomPokemon();

        
        document.getElementById("stop").innerText = "Stop (" + counter + " sec)";

        if (counter == 0) {
            clearInterval(timer);
        }

    }, 1000);

};

function stopPokemon() {
    clearInterval(timer);
    document.getElementById("stop").innerText = "Stop";
    counter = 15;
    console.log("I stopped");
};