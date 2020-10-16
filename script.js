//task 1:
//start button starts game, hides current content, adds search bar and search button.

//task 2:
//the search button does an ajax call based on the user input.
//modal pops up showing pokemon name, image, type, attack stat, defense stat, a confirm button, and a cancel button.
//the user needs to pick 3 pokemon
//cancel button closes modal, allows user to search more, will not add pokemon to team
function capitalize(word) {
  word = word.charAt(0).toUpperCase() + word.slice(1)
}
$('#search-btn').on('click', function(){
  event.preventDefault();
  var userInput = $('#input').val();
  var queryURL = "https://pokeapi.co/api/v2/pokemon/" + userInput;
  


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log('response:', response)

    var pokeID = response.id;
    var imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokeID + ".png";
    var name2 = response.name
    name2 = name2.charAt(0).toUpperCase() + name2.slice(1)
    $('#pokename').text(name2)
    $('#pokeimage').append('<div><img src=' + imageURL + '></div>')
    var type = response.types[0].type.name

    type = type.charAt(0).toUpperCase() + type.slice(1)
    $('#poketype').text(type + " type")

    $('#pokeattack').text("Attack stat: " + response.stats[1].base_stat)
    $('#pokedefense').text("Defense stat: " + response.stats[2].base_stat)
    $('#pokespeed').text("Speed stat: " + response.stats[5].base_stat)
  
    




});
});
//task 3:
//if confirm is clicked, current pokemon is added to team, modal closes, takes user back to search bar.
//progress bar of some sort to show how many pokemon are left to choose.

//task 4:
//create an array which holds the AIs possible pokemon choices
//AFTER the user picks their 3 pokemon, the AI picks 3 pokemon randomly from the array

function compTeamCreator() {
    compTeam = []

    for (var i = 0; i < 3; i++){
    
    var randomPokemon = Math.floor(Math.random()* Math.floor(721)) 
    var queryURL = "https://pokeapi.co/api/v2/pokemon/" + randomPokemon
    var name = ''
    var attack = ''
    var defense = ''
    var speed = ''
    var image = ''
    var baseEXP = ''
    
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        var pokeId = response.id
        name = response.forms[0].name;
        name = name.charAt(0).toUpperCase() + name.slice(1)
        speed = response.stats[5].base_stat;
        attack = response.stats[1].base_stat;
        defense = response.stats[2].base_stat;
        baseEXP = response.base_experience
        image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokeId + ".png"

        var compPokemon = {
        'pokemon' : name,
        'attack': attack,
        'defense': defense,
        'speed': speed,
        'base_exp': baseEXP,
        'picture': image,
        }  

        
    compTeam.push(compPokemon)
    console.log("test", compTeam)
    })

}
}


// compTeamCreator()


//task 5:
//When battle starts, the users pokemon choices will show up on buttons with the pokemons image
//when the user clicks one of their pokemon choices, a modal appears as the "battlefield" with the user choice pokemon and ai choice pokemon
//the modal should have a "fight" button

function battlePreveiw () {
    var battlefield = $('<div>')
    var userPokemon = $('<div>')
    var computerPokemon = $('<div>')
    var versus = $('<div>')

    userPokemon.css({
        "background": "red",
        "height" : "250px",
        "width": "250px",
        "float": "left",
        "text-align": "center",
    })
    var userName = $('<h2>')
    var userImg = $('<img>')
    userName.text("Bulbasaur")
    userImg.attr("src","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png")
    userImg.css({
      "height": "150px",
      "width" : "150px",
    })

    userPokemon.append(userName)
    userPokemon.append(userImg)

    computerPokemon.css({
        "background": "white",
        "border": "1px black",
        "height" : "250px",
        "width": "250px",
        "float": "right",
        "text-align": "center"
    })
    
    var aiName = $('<h2>')
    var aiImg = $('<img>')

    aiName.text("Bulbasaur")
    aiImg.attr("src","https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png")
    aiImg.css({
      "height": "150px",
      "width" : "150px",
    })
    
    computerPokemon.append(aiName)
    computerPokemon.append(aiImg)

    versus.css({
        "background" : "black",
        "color" : "white",
        "width" : "50px",
        "height": "150px",
        "float" : "center",
    })
    versus.text("VS")

    // var fieldImg = "https://i.redd.it/o8a7u5vl6hb41.png"
    battlefield.css({
        // "background-image": "url(" + fieldImg + ")",
        "background" : "grey",
        "height": "200px",
        "width": "600px",
        // "z-index" : "1",
    })

    battlefield.append(userPokemon)
    battlefield.append(versus)
    battlefield.append(computerPokemon)
    
    $('body').append(battlefield)
}

battlePreveiw()
//task 6:
//when fight button is clicked, a winner determined by:
  //the pokemon with the higher speed stat attacks first
  //if the attacking pokemons attack stat is higher than the defending pokemons defense stat, it will KO the defending pokemon.
  //if the attacking attack stat is lower thean the defending pokemons defense stat, it will not KO it.
  //the pokemon with the lower speed will attack second in the same manner if it is not KO'd
  //if there is a tie (neither pokemon KO each other), the winner will be determined by whichever pokemon has the higher base experience stat.
  //when a pokemon is KO'd, both sides are able to pick a new pokemon (AI picks random from choices), the defeated pokemon will be removed from that users choices. The winners pokemon is not removed.

//task 7:
  //A game winner is determined when either side runs out of pokemon.
  //If the user wins, they are presented with a congratulatory winning message (modal or new page) that tells them to go do something else using BoredAPI ("You totally rock at battling, how should go " + api input + " instead")
  //If the user loses, they are presented with a loser message telling them to go do something else using BoredAPI (EX: "You suck at battling, how about you go " + api input + " instead" )
  //along with the users win/lose message, they will be presented with a replay button which will restart the game.

  //extra comment


