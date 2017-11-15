<template>
<div class="cah-card"><span v-html="blackCard.text"></span></div>
</template>


<script>
import {DB} from "../Firebase.js";

export default {
    data: function() {
        return {
            text_val: this.text,
            pick_val: this.pick,
        };
    },
    props: {
        game: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        pick: {
            required: true
        }
    },
    watch: {
        game: function (newVal) {
            this.$bindAsObject('blackCard', DB.ref(this.game + "/black_card"))
        },
        text: function(newVal, oldVal) {
            this.$firebaseRefs.blackCard.update({ text: this.text, pick: this.pick });
        },
        pick: function(newVal, oldVal) {
            this.$firebaseRefs.blackCard.update({ text: this.text, pick: this.pick });
        }
    },
    firebase: {
        blackCard: {
            source: DB.ref(this.game + "/black_card"),
            asObject: true
        }
    },
};
</script>:

<style scoped>
div {
    height: 45%;
    width: 55%;
    color: white;
    background-color: black;
    float: left;
    vertical-align: top;
}
</style>
