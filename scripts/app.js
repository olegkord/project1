window.onload = function() {
  console.log("Website loaded and linked.");

  Game.makeDeck();
};



var Game = function(){
  //This game module is created on start. This will contain all the objects in the game.
  console.log('Game made');

  return {
    deck: null,

    makeDeck: function() {
      Game.deck = new Game.Deck();
      Game.deck.build();
    },
    Deck: function() {
      //constructor for a deck of cards.
      //member variables:
      this.cards = [];

      //member functions:
      this.shuffle = function(){
        //This function will shuffle the cards in the deck.
        //shuffle function expanded from memory.
        console.log('shuffling');
      }
      this.build = function(){
        //This function will populate the deck with cards.
        console.log('building deck');
        var suits = ['diams','hearts','spades','clubs'];
        for (var j=0; j < suits.length; j++) {

          for (var i=1; i < 10; i++){

            this.cards.push(new Game.Card(suits[j],i));
          }
        }
      }
    },

    Card: function(suit,number) {
      //constructor of Card object.
      //expected inputs: suit (str), number = num
      this.suit = suit;
      this.number = number;
    },
  }
}();
