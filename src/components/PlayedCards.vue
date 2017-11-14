<template>
<div class="players-container">
    <div class="player-container" v-for="player in players" :key="player.id">
        <div class="card-container" v-for="card in player.played" :key="card.id">
            <WhiteCard v-bind:class="{ revealed: card.revealed }" 
                @click.native="card.revealed = !card.revealed"
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
            players: [],
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
            this.$bindAsArray('players', DB.ref(this.game + "/players"))
        }
    },
    methods: {
        UpdatePlayed(player, white_card) {
            let cards_obj = { 
                id: ++cardId, 
                text: white_card, 
                revealed: false 
            }
            this.$firebaseRefs.players.child(player).child('played').push(cards_obj);
        },
        RevealedText: function(card) {
            return card.revealed ? card.text : this.hiddenText;
        },
        Clear() {
            for (let i = 0; i < this.players.length; i++) {
                var element = this.players[i];
                this.$firebaseRefs.players.child(element[".key"]).child("played").remove();
            } 
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

