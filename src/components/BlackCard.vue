<template>
<div class="cah-card">
    <span v-html="blackCard.text"></span>
    <span class="pick-text">PICK <span class="pick-num">{{blackCard.pick}}</span></span>
</div>
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
.cah-card {
    height: 45%;
    width: 45%;
    color: white;
    background-color: black;
    float: left;
    vertical-align: top;
    position: relative;
    font-size: 1.25em;
}
.pick-text {
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-weight: bold;
    font-family: "Helvetica Neue", "Helvetica"; 
    font-size: 0.6em;
}

.pick-num {
    display: inline-block;
    border-radius: 30px; /* or 50% */

    width: 20px;
    height: 20px;
    background-color: white;
    color: black;
    text-align: center;
    font-size: 1.25em;
}
</style>
