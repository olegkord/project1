window.onload = function() {
  console.log("Website loaded and linked.");

  var myDataRef = new Firebase('https://durak-card-game.firebaseio.com/');

  Game.start();


  var player1Ref = myDataRef.push();
  player1Ref.set(Game.players[0].state);

  var player2Ref = myDataRef.push();
  player2Ref.set(Game.players[1].state);


//   myDataRef.set({
//   title: "Hello World!",
//   author: "Firebase",
//   location: {
//     city: "San Francisco",
//     state: "California",
//     zip: 94103
//   }
// });

};



var Game = function(){
  //This game module is created on start. This will contain all the objects in the game.
  //For now, DEFAULT number of players is 2.
  console.log('Game made');

  var turn = 1;

  return {
    deck: null,
    trumpSuit: '',
    players: [],

    getTurn: function() {
      return turn;
    },
    setTurn: function(currentTurn) {
      switch (currentTurn) {
        case 1:
          turn = 2;
          break;
        case 2:
          turn = 1;
          break;
        default:
          alert('something went wrong in setTurn!');
      }
    },
    start: function() {
      Game.makeDeck();
      Game.deck.shuffle(Game.deck.cards);

      Game.players[0] = new Player(1,Game.deal(Game.deck),'human');
      Game.players[1] = new Player(2,Game.deal(Game.deck),'computer');

      console.log('Cards dealt');
    },

    makeDeck: function() {
      //Initiates a new deck object and fills it with cards.
      Game.deck = new Deck();
      Game.deck.build();
    },

    checkWin: function(player) {
      //This function will determine if any of the players has won.
    },

    deal: function(deck) {
      //This function will deal 6 cards from the deck.

      var hand = [];

      for (var i = 0; i < 6; i++) {
        hand.push(deck.cards.pop());
      }
      //When dealing, the card after the hands are deal dictates the trump.
      //This card is then placed at the very end of the deck.
      //Because we are "drawing" from the end of the Array we pop and push.
      Game.trumpSuit = Game.deck.cards[Game.deck.cards.length-1].suit;

      Game.deck.cards.push(Game.deck.cards.pop());

      console.log('Deck now has '+ deck.cards.length + ' cards');

      return hand;
    }
  }
}();

    //OBJECT CONSTRUCTORS BELOW.

 function Player(number,hand,operator) {
  //Constructor for a Player object
  this.number = number;
  this.hand = hand;
  this.operator = operator; //operator may be human or computer.

  this.state = {
    number: number,
    hand: hand,
    operator: operator,
  }

  this.play = function(card) {
    //function plays a card from the hand in a turn
    console.log('playing a card');
  }

  this.draw = function() {
    //draws a card fromt he deck and adds to the hand.
    console.log('drawing a card');
  }
};

 function Card(suit,number) {
  //constructor of Card object.
  //expected inputs: suit (str), number = num
  this.suit = suit;
  this.number = number;
};

 function Deck() {
  //constructor for a deck of cards.
  //member variables:
  this.cards = [];

  //member functions:
  this.shuffle = function(o){
    //This function will shuffle the cards in the deck.
    //shuffle function taken from memory game.
    console.log('shuffling');
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }
  this.build = function(){
    //This function will populate the deck with cards.
    console.log('building deck');
    var suits = ['diams','hearts','spades','clubs'];
    for (var j=0; j < suits.length; j++) {

      for (var i=6; i < 15; i++){

        this.cards.push(new Card(suits[j],i));
      }
    }
  }
};
