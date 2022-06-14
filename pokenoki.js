// set the url of the pokemon api
const url = 'https://pokeapi-enoki.netlify.app/pokeapi.json';

var pokemons;
var pokemon;


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


function displayRandomPokemon() {
    console.log("pokemons inside displayRandom", pokemons);

    // get a random pokemon
    pokemon = pokemons[Math.floor(Math.random()*pokemons.length)];

    // const backgroundColor 
    document.getElementById("allPokemons").style.backgroundColor = pokemon.background_color;
    
    // add name, level and icon
    var pokemonHeader = "";
    pokemonHeader += "<h2>" + pokemon.name + "</h2>";
    pokemonHeader += "<h2>" + "lvl" + pokemon.level + " " + pokemon.abilities[0].icon + "</h2>";
    document.getElementById("pokemonHead").innerHTML = pokemonHeader;
    
    // replace the pokemon figure according to the pokemon id
    switch(pokemon.id){
        default:
            console.log("Sorry, I can't change url image of pokemon figure...");
            break;
        
        case 1:
            // if id = 1 then imageId = 152 for germignon
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png";
            console.log("I changed to the right pokemon figure germignon for id 1");
            break;
        
        case 2:
            // if id = 2 then imageId = 158 for kamininus
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png";
            console.log("I changed to the right pokemon figure kamininus for id 2");
            break;
    
        case 3:
            // if id = 3 then imageId = 133 for eevee / evoli
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png";
            console.log("I changed to the right pokemon figure evoli for id 3");
            break;

        case 4:
            // if id = 4 then imageId = 399 for keunotor
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/399.png";
            console.log("I changed to the right pokemon figure keunotor for id 4");
            break;

        case 5:
            // if id = 5 then imageId = 148 for draco
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png";
            console.log("I changed to the right pokemon figure draco for id 5");
            break;

        case 6:
            // if id = 6 then imageId = 25 for pikachu
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";
            console.log("I changed to the right pokemon figure pikachu for id 6");
            break;

        case 7:
            // if id = 7 then imageId = 77 for ponyta
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png";
            console.log("I changed to the right pokemon figure ponyta for id 7");
            break;

        case 8:
            // if id = 8 then imageId = 398 for staraptor
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/398.png";
            console.log("I changed to the right pokemon figure staraptor for id 8");
            break;

        case 9:
            // if id = 9 then imageId = 383 for groudon
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/383.png";
            console.log("I changed to the right pokemon figure groudon for id 9");
            break;

        case 10:
            // if id = 10 then imageId = 470 for phyllali
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/470.png";
            console.log("I changed to the right pokemon figure phyllali for id 10");
            break;

        case 11:
            // if id = 11 then imageId = 873 for beldeneige
            pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/873.png";
            console.log("I changed to the right pokemon figure beldeneige for id 11");
            break;
    };

    // add background image and pokemon
    var pokemonImage = "";
    pokemonImage += "<img id='pokemonImageBackground' src='images/fond-carte.jpg' alt='background of the pokemon card' />"
    pokemonImage += "<img id='pokemonFigure' src=" + pokemon.image + " alt="+ pokemon.name +">";
    document.getElementById("pokemonImage").innerHTML = pokemonImage;
    
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
    clonePokemon.removeAttribute("id");
    clonePokemon.classList.add("choosenPokemon");

    var children = clonePokemon.childNodes;

    for (var i = 0; i < children.length; i++) {    
        children[i].id = index

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