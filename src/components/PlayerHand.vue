<template>
<div class="hand">
    <WhiteCard v-bind:class="{ selected: card.isSelected }" 
        @click.native="card.isSelected = !card.isSelected"
        v-for="card in hand"
        :key="card.id"
        :text="card.text"
    />
</div>
</template>


<script>
let cardId = 1;

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
    methods: {
        UpdateHand(white_card) {
            this.hand.push({ id: ++cardId, text: white_card, isSelected: false });
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
                if ( card.isSelected == true && card.text == played_card )
                {
                    card.isSelected = false;
                    this.hand.splice( index, 1 );
                }
            };
        }
    }
};

</script>:

<style scoped>
.hand {
    z-index: 100;
}

:not(.selected) {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-top: 6em;
}

.selected {
    white-space: nowrap;
    /* transform: translateY(-9.5em); */
    margin-bottom: 14em;
}

div:nth-child(n+2) {
    margin-left: -5em;
}

</style>
