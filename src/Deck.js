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
        return { text: card_data.text, pick: Number(card_data.pick) }
    }

    DrawWhiteCard() {
        var idx = Math.floor(Math.random() * _white_cards.length);
        var card_data = _white_cards[idx];
        _white_cards.splice(idx, 1);
        return card_data;
    }
}