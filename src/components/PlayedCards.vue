<template>
<div class="players-container">
    <div class="player-container" v-for="player in played" :key="player.id">
            <WhiteCard v-bind:class="{ revealed: card.revealed }" v-for="(card, card_key) in player.cards" :key="card.id"
                @click.native="Reveal( player, card, card_key, $event )"
                :text="RevealedText(card)"
            />
    </div>
</div>
</template>


<script>
let cardId = 1;
let playerId = 1;

import {DB} from "../Firebase.js";
import WhiteCard from "./WhiteCard.vue";
export default {
    components: {
        WhiteCard
    },
    data: function() {
        return {
            played: [],
            hiddenText: "",
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
        }
    },
    firebase: {
        played: {
            source: DB.ref(this.game + "/played")
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
        RevealedText: function(card) {
            return card.revealed ? card.text : this.hiddenText;
        },
        Reveal(player, card, card_key, event) {
            this.$firebaseRefs.played.child(player[".key"]).child("cards").child(card_key).child("revealed").set(!card.revealed);
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
    margin-bottom: -2.5em;
}

div[class=cah-card] {
    background-image: url("../assets/CAH-Card-Logo.svg");
    background-repeat: no-repeat;
    height: 2em; 
    width: 1em;
    margin-right: -1.5em;
    white-space: nowrap;
}

div[class="cah-card revealed"] {
    position: fixed;
    top: 4em;
    left: 50%;
    /* transform: translateX(-9.5em); */
}

</style>

