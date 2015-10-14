# Project 1:
## Durak the Russian card game.

### Objective:

get rid of all the cards in your hand.

### Start condition:

36 cards in the deck, from 6 to ace. 2 players draw 6 cards each from the deck. the 13th card is flipped face up and dictates the "trump" suit. Remaining cards int he deck are placed next to this card.

### Play:

1) player 1 places a card on the table "attacking" player 2.

2) Player 2 must beat this card with a card of the same suit but higher number. If this happens the cards go into the discard pile.
  - If player 2 does not have the same suit but higher number card, he may use a card of the trump suit of any number.
  - If player 2 cannot do the above, he must collect all the cards on the table and loses his next turn.

3) Play continues until the deck is empty and one of the two players has no more cards in his or her hand.

### User stories:

- The User must be able to start a game with a shuffled deck
- The User must be dealt a hand of 6 cards
- The User must be able to determine the trump suit.
- The User must be able to "attack" other player with a card of his choice.
- The other player must be able to defend with a card of his choice.
- The User must be able to replenish cards from the deck
- The User must be able to win when there are no cards left in the deck and no cards left in his hand.
