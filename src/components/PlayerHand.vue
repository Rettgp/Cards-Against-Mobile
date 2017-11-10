<template>
<div>
<WhiteCard
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
            this.hand.push({ id: ++cardId, text: white_card });
        }
    }
};
</script>:

<style scoped>
div {
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    top: 4.25em;
    /* margin-right: -5em; */
}

</style>
