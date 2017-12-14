<template>
<div class="players-container">
    <div class="player-container" v-for="player in played" :key="player.id">
            <WhiteCard v-bind:class="{ revealed: card.revealed }" v-for="(card, card_key) in player.cards" :key="card.id"
                @click.native="Reveal( player, card, card_key, $event )"
                text=""
            />
    </div>
</div>
</template>


<script>
let cardId = 1;
let playerId = 1;
let previousLength = 0;

import {DB} from "../Firebase.js";
import WhiteCard from "./WhiteCard.vue";
export default {
    components: {
        WhiteCard
    },
    data: function() {
        return {
            played: [],
            randomPlayed: []
        };
    },
    props: {
        game: {
            type: String,
            required: true
        }
    },
    watch: {
        game: function (newVal) {
            this.$bindAsArray('played', DB.ref(this.game + "/played"))
        },
        played: function (newVal) {
            if (newVal.length === 0 || newVal.length === previousLength) {
                return;
            }
            var currentIndex = this.played.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = this.played[currentIndex];
                this.played[currentIndex] = this.played[randomIndex];
                this.played[randomIndex] = temporaryValue;
            }
            previousLength = newVal.length;
        }
    },
    firebase: {
        played: {
            source: DB.ref(this.game + "/played"),
            asArray: true
        }
    },
    methods: {
        UpdatePlayed(player, white_card) {
            let cards_obj = { 
                id: ++cardId, 
                text: white_card, 
                revealed: false 
            }
            this.$firebaseRefs.played.child(player).child("cards").push(cards_obj);
        },
        Reveal(player, card, card_key, event) {
            this.$firebaseRefs.played.child(player[".key"]).child("cards").child(card_key).child("revealed").set(!card.revealed);
        },
        GetSelected() {
            let revealed_cards = [];
            for (var i = 0; i < this.played.length; i++) {
                let player = this.played[i];
                for (var key in player.cards) {
                    if (player.cards.hasOwnProperty(key)) {
                        let card_data = player.cards[key];
                        if ( card_data.revealed ) {
                            revealed_cards.push(card_data.text);
                        }
                    }
                }
            }

            if ( revealed_cards.length <= 0 ) {
                return "";
            }
            return revealed_cards[revealed_cards.length - 1];
        },
        Clear() {
            this.cardId = 1;
            this.playerId = 1;
            this.$firebaseRefs.played.remove();
        }
    }
};
</script>:

<style scoped>

.players-container {
    vertical-align: top;
    display: inline-block;
    width: 45%;
    height: 51%;
    overflow-y: scroll;
}

.player-container {
    display: block;
    margin-bottom: -1em;
}

.cah-card {
    background-image: url("../assets/CAH-Card-Logo.svg");
    background-repeat: no-repeat;
    height: 2em; 
    width: 1em;
    margin-right: -1.2em;
    white-space: nowrap;
}

div[class="cah-card revealed"] {
    z-index: 200;
    border: 1px solid #007aff;
    transform: translateY(5%);
}

</style>

