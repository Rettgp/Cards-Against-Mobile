<template>
<div class="hand">
    <WhiteCard v-for="card in hand" :key="card.id"
        v-bind:class="{ selected: card.isSelected }" 
        @click.native="card.isSelected = !card.isSelected" 
        :text="card.text"/>
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
    height: 20%;
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    left: 0;
    bottom: 0;
    position: absolute;
}

.hand .selected {
    position: fixed;
    left: 0;
    z-index: 200;
    transform: translateY(-100%);
}

.cah-card {
    margin-right: -5em;
}

</style>
