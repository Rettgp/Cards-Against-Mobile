<template>
<div class="players-container">
    <div class="player-container" v-for="player in played" :key="player.id">
        <div class="card-container" v-for="(card, card_key) in player.cards" :key="card.id">
            <WhiteCard v-bind:class="{ revealed: card.revealed }" 
                @click.native="Reveal( player, card, card_key, $event )"
                :text="RevealedText(card)"
            />
        </div>
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
            hiddenText: ""
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
            console.log(player);
            this.$firebaseRefs.played.child(player[".key"]).child("cards").child(card_key).child("revealed").set(!card.revealed);
        },
        Clear() {
            this.$firebaseRefs.remove();
        }
    }
};
</script>:

<style scoped>

.players-container {
    display: inline-block;
    vertical-align: top;
}

.card-container {
    vertical-align: top;
    display: inline-block;
    direction: left;
}

:not(.revealed) {
    background-image: url("../assets/CAH-Card-Logo.svg");
    background-repeat: no-repeat;
    height: 2em; 
    width: 1em;
    margin-bottom: 2em;
    margin-right: 1.5em;
    white-space: nowrap;
}

.revealed {
    transform: translateX(-9.5em);
}

</style>

