// set the url of the pokemon api
const url = 'https://pokeapi-enoki.netlify.app/pokeapi.json';

var pokemons;
var pokemon;
// console.log("I am global pokemons before", pokemons)

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

// console.log("I am global pokemons after", pokemons)


function displayRandomPokemon() {
    console.log("pokemons inside displayRandom", pokemons);

    // get a random pokemon
    pokemon = pokemons[Math.floor(Math.random()*pokemons.length)];

    // console.log("index 0 of pokemons", pokemons[0])
    const pokemonDisplay = document.getElementById("pokemonImage");

    // const backgroundColor 
    document.getElementById("allPokemons").style.backgroundColor = pokemon.background_color;
    
    // add name, level and icon
    var pokemonHeader = "";
    pokemonHeader += "<h2>" + pokemon.name + "</h2>";
    pokemonHeader += "<h2>" + "lvl" + pokemon.level + " " + pokemon.abilities[0].icon + "</h2>";
    document.getElementById("pokemonHead").innerHTML = pokemonHeader;
    
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
        allAbilities += "<h3>" + pokemonAbilities[a].icon + " " + pokemonAbilities[a].name + "</h3>";
        allAbilities += "<h3>" + pokemonAbilities[a].power + "</h3>";
        allAbilities += "</div>";
        allAbilities += "<p>" + pokemonAbilities[a].description +"</p>";
    };

    document.getElementById("pokemonAbilities").innerHTML = allAbilities;
    console.log("I am the actual index", pokemons.indexOf(pokemon));
};

// add card in deck 
function addCard(changement) {

    let addedPokemon = document.getElementById("allPokemons");

    const index = pokemons.indexOf(pokemon);

    console.log("I am added pokemon", addedPokemon)

    let clonePokemon = addedPokemon.cloneNode(true);
    clonePokemon.id = "choosenPokemon"

    var children = clonePokemon.childNodes;

    for (var i = 0; i < children.length; i++) {    
        children[i].id = "choosenPokemon" + index

    }

    
    console.log("I am the clone", clonePokemon)
    changement.appendChild(clonePokemon);

    console.log("pokemons in addCard", pokemons);

    if (index > -1) {
        pokemons.splice(index, 1); // 2nd parameter means remove one item only
    }

    console.log("pokemons - pokemon :", pokemons); 
}

// add card in differents cards
function choosePokemon() {
    console.log("I'm in choosePokemon");
    console.log("I am pokemons in choosePokemon()", pokemons);

    if (document.getElementById("firstPokemonCard").childNodes.length === 0) {
        let changement = document.getElementById("firstPokemonCard")
        console.log("I am empty, I'll fill it with cards!");
        addCard(changement);
        displayRandomPokemon();
    } else {
        console.log("I am not empty, I'll go on next div -> 2!")

        if (document.getElementById("secondPokemonCard").childNodes.length === 0) {
            let changement = document.getElementById("secondPokemonCard")
            console.log("I am empty, I'll fill it with cards!");
            addCard(changement);
            displayRandomPokemon();
        } else {
            console.log("I am not empty, I'll go on next div -> 3!")

            if (document.getElementById("thirdPokemonCard").childNodes.length === 0) {
                let changement = document.getElementById("thirdPokemonCard")
                console.log("I am empty, I'll fill it with cards!");
                addCard(changement);
                displayRandomPokemon();
            } else {
                console.log("I am not empty, I'll go on next div -> 4!")

                if (document.getElementById("fourthPokemonCard").childNodes.length === 0) {
                    let changement = document.getElementById("fourthPokemonCard")
                    console.log("I am empty, I'll fill it with cards!");
                    addCard(changement);
                    displayRandomPokemon();
                } else {
                    console.log("I am not empty, I'll go on next div -> 5!")

                    if (document.getElementById("fivePokemonCard").childNodes.length === 0) {
                        let changement = document.getElementById("fivePokemonCard")
                        console.log("I am empty, I'll fill it with cards!");
                        addCard(changement);
                        displayRandomPokemon();
                    } else {
                        console.log("I am not empty, I'll go on next div -> 6!")

                        if (document.getElementById("sixPokemonCard").childNodes.length === 0) {
                            let changement = document.getElementById("sixPokemonCard")
                            console.log("I am empty, I'll fill it with cards!");
                            addCard(changement);
                            displayRandomPokemon();
                        } else {
                            console.log("I am not empty, I'll stop because my deck is full!")
                        }
                    }
                }
            }

        }
    }

    console.log("I am pokemons after choosen card", pokemons);
    // to be continued...
};

// start and stop the shuffle
var counter = 15;
var timer;

function changePokemon() {
    console.log("I start the count");
    console.log("pokemons in changePokemon()", pokemons);

    timer = setInterval(function () {
        console.log("I am in setInterval");

        counter -= 1;

        displayRandomPokemon();

        document.getElementById("stop").innerText = "Stop (" + counter + " sec)";

        if (counter == 0) {
            stopPokemon();
        }

    }, 1000);

};

function stopPokemon() {
    clearInterval(timer);
    document.getElementById("stop").innerText = "Stop";
    counter = 15;
    console.log("I stopped");
};