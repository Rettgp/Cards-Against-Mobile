var _black_cards = [];
var _white_cards = [];
export default class Deck {
    constructor() {
        var json = require("../static/Cards.json");
        _black_cards = json.blackCards;
        _white_cards = json.whiteCards;
    }

    DrawBlackCard() {
        var idx = Math.floor(Math.random() * _black_cards.length);
        var card_data = _black_cards[idx];
        _black_cards.splice(idx, 1);
        console.log("Black cards left: " + _black_cards.length);
        console.log(card_data.text);
        console.log(Number(card_data.pick));
        return { text: card_data.text, pick: Number(card_data.pick) }
    }
}