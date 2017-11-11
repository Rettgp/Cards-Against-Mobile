<template>
<div>
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
    }
};

</script>:

<style scoped>

:not(.selected) {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    top: 4.75em;
}

.selected {
    white-space: nowrap;
    z-index: 200;
    margin-bottom: 10em;
}

div:nth-child(n+2) {
    margin-left: -5em;
}

</style>
