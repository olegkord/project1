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


Cards notes follow below.

=======
CSS Playing Cards
=================

CSS Playing Cards help you to create simple and semantic playing cards in (X)HTML.

* @author   Anika Henke <anika@selfthinker.org>
* @license  CC BY-SA [http://creativecommons.org/licenses/by-sa/3.0]
* @version  2011-06-14
* @link     http://selfthinker.github.com/CSS-Playing-Cards/

Contents
--------

* **cards.css** is the main part and provides the styles for the cards
* **cards-ie.css** is a tiny fix for IE < 9 to make a simple version work
* **cards-ie9.css** is a fix for IE9
* **examples.html** provides some example HTML
* **README.md** is this file
* **faces/** contains images for the faces

How to use it
-------------

### Surrounding container

    <div class="playingCards [fourColours|faceImages|simpleCards|inText|rotateHand]">
        ...
    </div>

There needs to be a surrounding container with the class "playingCards" around all the cards. That container can also have other classes which serve as **configuration options**:

* **fourColours**: Switches the default two colour deck with a four colour deck. (The colours of the German four colour deck will be different.)
* **faceImages**: Switches the default dingbat symbols for faces with images. *Note: Depending on the size of the card, you might need to adjust the image positioning of the faces in cards.css and the font-size in cards-ie9.css (search for "@change").*
* **simpleCards**: Switches the default multiple suits to one simple single big suit in the middle.
* **inText**: Switches the size to something small enough to fit into normal text and also removes the inner bits.
* **rotateHand**: Switches the hand to rotate and fan in a semi circle.

### The back of a card

    <[element] class="card back">*</[element]>

To make the cards smaller or bigger, just change the font-size in the main "card" class in cards.css (search for "@change").

### The front of a card

    <[element] class="card rank-[2|3|4|5|6|7|8|9|10|j|q|k|a] [diams|hearts|spades|clubs]">
        <[element] class="rank">[2|3|4|5|6|7|8|9|10|J|Q|K|A]</[element]>
        <[element] class="suit">&[diams|hearts|spades|clubs];</[element]>
    </[element]>

Depending on the context, the main card element should either be an **a** (for selecting single cards), a **label** (for selecting multiple cards), an **abbr** (for making a card more accessible with a title), a **div** or a **span** (for pure representation or played cards), e.g.

    <[a|label|abbr|div|span] class="card rank-a clubs" [href=""] [title=""]>
        <span class="rank">A</span>
        <span class="suit">&clubs;</span>
        [<input type="checkbox" [...] />] <!-- if in label -->
    </[a|label|abbr|div|span]>

### A joker

    <[element] class="card joker [big|little]">
        <[element] class="rank">[+|-]</[element]>
        <[element] class="suit">Joker</[element]>
    </[element]>

### Different hands

    <ul class="[table|hand|deck]">
        <li>
            [<strong>] <!-- if selected -->
                ... card ...
            [</strong>]
        </li>
        ...
    </ul>

* **table** places the whole cards side by side.
* **hand** places them side by side, but lets them overlap, so you will only see a part of each card. If the "rotateHand" option is enabled, you'll see the cards rotated in a semi circle.
* **deck** places the cards on top of each other, so that you cannot see single cards but a pack.

Requirements
------------

The CSS is only intended to work in **modern browsers** (Firefox 3.6+, Opera 10+, Chrome, Safari, IE9).
To make a basic version work in IE8, you need the provided **cards-ie.css**. And IE9 also needs a little fix, as provided in **cards-ie9.css**.

Credits
-------

* The faces' images are taken from [svg-cards](http://svg-cards.sourceforge.net/)
* One of the cards back images was taken from http://www.squidfingers.com/patterns/
>>>>>>> d65aaa631fef164edebf86d4adb3c8b14f1d0dd4
