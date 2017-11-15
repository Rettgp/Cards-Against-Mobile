<template>
<div class="hand">
    <WhiteCard style="margin-top: 1em; height: 65%; width: 45%;" v-for="card in hand" :key="card.id"
        v-bind:class="{ selected: card.isSelected }" 
        @click.native="card.isSelected = !card.isSelected" 
        :text="card.text"/>
</div>
</template>


<script>
let cardId = 1;

import {DB} from "../Firebase.js";
import WhiteCard from "./WhiteCard.vue";
export default {
    components: {
        WhiteCard
    },
    data: function() {
        return {
            hand: []
        };
    },
    props: {
        game: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    watch: {
        game: function (newVal) {
            this.$bindAsArray('hand', DB.ref(this.game + "/players/" + this.name + "/hand"))
        }
    },
    firebase: {
        hand: {
            source: DB.ref(this.game + "/players/" + this.name + "/hand")
        }
    },
    methods: {
        UpdateHand(white_card) {
            this.$firebaseRefs.hand.push({ id: ++cardId, text: white_card, isSelected: false });
        },
        GetSelected() {
            for (var index = 0; index < this.hand.length; index++) {
                let card = this.hand[index];
                if ( card.isSelected == true )
                {
                    return card.text;
                }
            }

            return "";
        },
        RemoveCard(played_card) {
            for (var index = 0; index < this.hand.length; index++) {
                let card = this.hand[index];
                let card_key = card[".key"];
                if ( card.isSelected == true && card.text == played_card )
                {
                    this.$firebaseRefs.hand.child(card_key).remove();
                }
            };
        }
    }
};

</script>:

<style scoped>
.hand {
    height: 35%;
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    left: 0;
    bottom: 0;
    position: absolute;
}

.hand .selected {
    z-index: 200;
    border: 1px solid #007aff;
    transform: translateY(-9%);
}

.cah-card {
    font-size: 1.25em;
}

</style>
