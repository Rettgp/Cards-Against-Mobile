<template>
<div class="players-container">
    <div class="player-container" v-for="player in players" :key="player.id">
        <div class="card-container" v-for="card in player.cards" :key="card.id">
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
            this.$bindAsArray('players', DB.ref(this.game + "/cards_played"))
        }
    },
    firebase: {
        players: {
            source: DB.ref(this.game + "/cards_played")
        }
    },
    methods: {
        UpdatePlayed(player, white_card) {
            let player_idx = -1;
            let db_key = -1;
            for (let i = 0; i < this.players.length; i++) {
                let element = this.players[i];
                if ( element.name == player ) {
                    db_key = element[".key"];
                    player_idx = i;
                    break;
                }
            } 

            if (player_idx < 0 ) {
                let obj_val = {
                    id: ++playerId,
                    name: player,
                    cards: [{ id: ++cardId, text: white_card, revealed: false }]
                }
                this.$firebaseRefs.players.push(obj_val).getKey();
            } else {
                let cards_obj = { 
                    id: ++cardId, 
                    text: white_card, 
                    revealed: false 
                }

                console.log(this.$firebaseRefs.players.child(db_key));
                this.$firebaseRefs.players.child(db_key).child('cards').push(cards_obj);
            }
        },
        RevealedText: function(card) {
            return card.revealed ? card.text : this.hiddenText;
        },
        Clear() {
            this.$firebaseRefs.players.remove();
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

