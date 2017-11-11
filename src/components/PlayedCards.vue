<template>
<div class="players-container">
    <div class="played-container" v-for="player in players" :key="player.id">
        <WhiteCard v-bind:class="{ revealed: card.revealed }" 
            @click.native="card.revealed = !card.revealed"
            v-for="card in player.cards"
            :key="card.id"
            :text="RevealedText(card)"
        />
    </div>
</div>
</template>


<script>
let cardId = 1;
let playerId = 1;

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
    methods: {
        UpdatePlayed(player, white_card) {
            if (typeof this.players[player] == "undefined") {
                this.players.push({
                    id: ++playerId,
                    cards: [{ id: ++cardId, text: white_card, revealed: false }]
                });
            } else {
                this.players[player].id = ++playerId;
                this.players[player].cards.push({ 
                    id: ++cardId, 
                    text: white_card, 
                    revealed: false 
                });
                this.players[player].cards.push({ 
                    id: ++cardId, 
                    text: white_card, 
                    revealed: false 
                });
            }
        },
        RevealedText: function(card) {
            return card.revealed ? card.text : this.hiddenText;
        }
    }
};
</script>:

<style scoped>

.players-container {
    display: inline-block;
    vertical-align: top;
}

:not(.revealed) {
    background-image: url("../assets/CAH-Card-Logo.svg");
    background-repeat: no-repeat;
    height: 2em; 
    width: 1em;
    padding-bottom: 1em;
}

.revealed {
    height: 11em;
    width: 7em;
    font-size: 1em;
    transform: translateX(-9.5em);
}

</style>

