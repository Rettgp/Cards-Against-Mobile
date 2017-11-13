<template>
<div class="hand" v-bind:style="{ 'overflow-x': overflowX, 'overflow-y': overflowY }">
    <WhiteCard v-for="card in hand" :key="card.id"
        v-bind:class="{ selected: card.isSelected }" 
        @click.native="(event) => { CardSelected(event, card); }" 
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
            hand: [],
            overflowX: "scroll",
            overflowY: "hidden",
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
        },
        CardSelected(event, card) {
            card.isSelected = !card.isSelected;
            // if ( card.isSelected ) {
            //     this.overflowX = "visible";
            //     this.overflowY = "visible";
            // } else {
            //     this.overflowX = "scroll";
            //     this.overflowY = "hidden";
            // }
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

.selected {
    z-index: 200;
    transform: translateY(-90%);
}

.cah-card {
    margin-right: -5em;
}

</style>
