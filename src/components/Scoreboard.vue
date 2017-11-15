
<template>
<div class="listblock">
<ul>
    <li v-for="player in players" :key="player['.key']"><div class="item-content"><div class="item-inner">
        <span>{{ player['.key'] }}</span>
        <f7-link icon-f7="delete" @click="Decrement(player)"></f7-link>
        <input class="score-input" v-model="player.score" readonly type="number"></input>
        <f7-link icon-f7="add" @click="Increment(player)"></f7-link>
    </div></div></li>
</ul>
</div>
</template>


<script>
import {DB} from "../Firebase.js";
export default {
    data: function() {
        return {
            players: []
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
            this.$bindAsArray('players', DB.ref(this.game + "/players"))
        }
    },
    firebase: {
        players: {
            source: DB.ref(this.game + "/players")
        }
    },
    methods: {
        Increment(player) {
            if (typeof player.score == "undefined")
            {
                player.score = 0;
            }
            this.$firebaseRefs.players.child(player[".key"]).child("score").set(player.score + 1);
        },
        Decrement(player) {
            if (typeof player.score == "undefined")
            {
                player.score = 0;
            }
            this.$firebaseRefs.players.child(player[".key"]).child("score").set(player.score - 1);
        }
    }
};

</script>:
<style scoped>
a {
    padding: 10px;
}

.score-input {
    text-align: center;
}

</style>
