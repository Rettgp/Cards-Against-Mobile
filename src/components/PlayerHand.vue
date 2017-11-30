<template>
<div class="hand">
        <span class="hand-size">{{hand.length}} / 10</span>
    <WhiteCard class="hand-card" @swipeup="PlayCard" v-for="card in hand" :key="card.id"
        v-bind:class="{ selected: card.isSelected, draggable: card.isSelected }" 
        @click.native="Select(card, $event)" 
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
        Select(card, event) {
            let element = this.FindParent(event.target, "hand-card")
            card.isSelected = !card.isSelected;
            let selected = card.isSelected;
            this.$emit("selected", {element, selected});
        },
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
        PlayCard() {
            console.log("PLAY");
            this.$emit("PlaySelectedCard");
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
        },
        FullHand() {
            return this.hand.length >= 10;
        },
        FindParent(element, class_name) {
          var node = element.parentNode;
          while (node != null) {
              if (typeof node.classList !== "undefined" && 
                node.classList.contains(class_name)) {
                  return node;
              }
              node = node.parentNode;
          }
          return element;
        },
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

.hand-card {
    margin-top: 1em; height: 65%; width: 45%;
    font-size: 1.25em;
    transition: 0.3s;
}

.hand-size {
    transform: translate3d(0,0,0);
    position: fixed;
    left: 0;
    z-index: 300;
    font-weight: bold;
    font-family: "Helvetica Neue", "Helvetica"; 
}

</style>
