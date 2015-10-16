window.onload = function() {
  console.log("Website loaded and linked.");

  var myDataRef = new Firebase('https://durak-card-game.firebaseio.com/');
  cleanup(myDataRef); //refreshes the DB on every new run

  RegisterListeners.setEvents();

  Game.start();


myDataRef.set(Game.getState());


  // myDataRef.child("deck/0/number").on("value", function(snapshot) {
  //   alert(snapshot.val());  // Alerts "San Francisco"
  // });
  //debugger;

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

    getState: function() {
      return {
        deck: Game.deck.cards,
        trumpSuit: Game.trumpSuit,
        player1: Game.players[0].state,
        player2: Game.players[1].state,
      }
    },

    getTurn: function() {
      return turn;
    },
    setTurn: function(currentTurn) {
      console.log('SETTING NEW TURN!!');
      switch (currentTurn) {
        case 1:
          turn = 2;
          break;
        case 2:
          turn = 1;
          break;
        default:
          alert('something went wrong in setTurn.');
      }
    },

    start: function() {
      Game.makeDeck();
      Game.deck.shuffle(Game.deck.cards);

      Game.players[0] = new Player(1,Game.deal(Game.deck),'human');
      Game.players[1] = new Player(2,Game.deal(Game.deck),'computer');

      console.log('Cards dealt');

      Game.render.players();
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
        //Players have not yet been created yet, so this is necessary.
        hand.push(deck.cards.pop());
        $('#draw li:last').remove();
      }
      //When dealing, the card after the hands are deal dictates the trump.
      //This card is then placed at the very end of the deck.
      //Because we are "drawing" from the end of the Array we pop and push.
      Game.trumpSuit = Game.deck.cards[Game.deck.cards.length-1].suit;

      Game.deck.cards.push(Game.deck.cards.pop());

      console.log('Deck now has '+ deck.cards.length + ' cards');

      return hand;
    },

    makeAttack: function(jqReference){
      //Every other turn a player attacks the other player with a card.
      var cardRank = parseInt(jqReference.attr('data-value'));

      var cardSuit = jqReference.attr('class');
      cardSuit = cardSuit.split(' ');
      cardSuit = cardSuit[cardSuit.length-1];

      //player field already exists.
      $('.player#field').append($('<ul/>').addClass('hand').append(jqReference.parent()));


      console.log('Playas gonna play');

      if (Game.getTurn() === 1) {
        //if Player 1 just attacked, prevent him from going again.
//------->MODIFIY WITH MORE ADVANCED RULES LATER!!!

      //Switch event listeners to allow other player to respond to the attack.
        $('#one > .table > li').off('click');
        $('#two > .table > li').click(function(){
          Game.makeDefend(jqReference,$(this).children());
        })
      }
//SWITCH TURN AFTER DEFENCE IS DONE.
//------->Game.setTurn(Game.getTurn());

      //Game.render.players();
    },

    makeDefend: function(jqRefAttackCard,jqRefChosenCard) {
      //When attacked, the other player must defend with a card of his choosing.
      //Inputs: attacking card (from Game.makeAttack()) and card selected by the player to defend.

      var atkCardSuit = jqRefAttackCard.attr('class');
      atkCardSuit = atkCardSuit.split(' ');
      atkCardSuit = atkCardSuit[atkCardSuit.length-1];

      var defCardSuit = jqRefChosenCard.attr('class');
      defCardSuit = defCardSuit.split(' ');
      defCardSuit = defCardSuit[defCardSuit.length-1];

      if (atkCardSuit === defCardSuit) {
        if (parseInt(jqRefAttackCard.attr('data-value')) < parseInt(jqRefChosenCard.attr('data-value'))) {
//-->Defending player has beaten the attacking card.
        $('.player#field > .hand').append(jqRefChosenCard.parent());
        }
        else {
          alert('choose another card!');
        }
      }
      else if (defCardSuit === Game.trumpSuit) {
//-->Defending player has beaten the attacking card.
        $('.player#field > .hand').append(jqRefChosenCard.parent());
      }
      else {
        alert('choose another card!');
      }
    },
    recover: function() {
      console.log('recovering from turn');

      for (var i = 1; i < 3; i++){
        while (Game.players[i].hand.length > 7) {
          Game.players[i].draw();
        }
      }
    },
    render: {
      players: function(){
      //render players hands:
      for (var i = 0; i < Game.players[0].hand.length; i++) {
        $('#one > .table').append($('<li/>').append(Game.players[0].hand[i].jqCard));
      }
      for (var i = 0; i < Game.players[1].hand.length; i++) {
        $('#two > .table').append($('<li/>').append(Game.players[1].hand[i].jqCard));
      }

      //Every time game is refreshed, update event listeners.
      if (Game.getTurn()===1){
        $('#one > .table > li').click(function(){
          Game.makeAttack($(this).children());
        })


        //  MAYBE HERE SET AN EVENT LISTENER INSIDE MAKE ATTACK!!?!?!?
        $('#two > .table > li').off('click');
      }
      else if (Game.getTurn()===2) {
        $('#two > .table > li').click(function(){
          Game.makeAttack($(this).children());
        })
        $('#one > .table > li').off('click');
      }

      //Say what the trump suit is:
      $('.trump').html('<h1>The trump suit is &'+Game.trumpSuit+ ';</h1>');
      }
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

  this.draw = function() {
    //draws a card fromt he deck and adds to the hand.
    console.log('drawing a card');
      if (Game.deck.cards.length != 0) {
      $('#draw li:last').remove();
      this.hand.push(Game.deck.cards.pop());
      Game.render.players();
      console.log('Deck now has '+ Game.deck.cards.length + ' cards');
    }
  }
};

 function Card(suit,number,jqObj) {
  //constructor of Card object.
  //expected inputs: suit (str), number = num
  this.suit = suit;
  this.number = number;
  this.jqCard = jqObj;
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
    var rank = '';
    var suits = ['diams','hearts','spades','clubs'];
    for (var j=0; j < suits.length; j++) {
      for (var i=6; i < 15; i++){
          switch(i) {
            case 11 :
              rank = 'j';
              break;
            case 12 :
              rank = 'q';
              break;
            case 13 :
              rank = 'k';
              break;
            case 14 :
              rank = 'a';
              break;
            default :
              rank = i.toString();
          }

          //Builds the cards using jquery based on the CSS for the cards.

          var rankStr = 'rank-'+rank;
          var suitsSym = '\n&'+suits[j]+';\n';
          var cardOuter = $('<a/>').addClass('card').addClass(rankStr).addClass(suits[j]).attr('data-value',i);
          cardOuter.append($('<span/>').addClass('rank').html(rank.toUpperCase()));
          cardOuter.append($('<span/>').addClass(suits[j]).html(suitsSym));

          var drawDeck = $('.deck#draw').append($('<li/>').html('<div class=\"card back\">*</div>'));

          this.cards.push(new Card(suits[j],i,cardOuter));
        }
      }

      //fun with Jquery:
      //cards will be divs.
    }
};

function cleanup(reference) {
  reference.remove();
}

var RegisterListeners = function() {

  return {
    setEvents: function() {
      $('.discard').click(function(){
//----->THIS CONDITION WILL CHANGE!!
        console.log('discarding cards to discard deck');
        if ($('#field > .hand').children().length > 1) {
          $('.deck#discard').append($('#field > .hand').children());
          Game.recover();
        }
        else {
          alert('Insufficient cards are in play!!');
        }
      })
    },
  }
}();
