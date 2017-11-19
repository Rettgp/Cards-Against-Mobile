<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Scores" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-navbar v-if="$theme.material" title="Left Panel" sliding></f7-navbar>
            <f7-list>
              <scoreboard :game="game_id"/>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <div class="login-screen modal-in">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title><img style="height:100%; width: 80%;" src="./assets/login-banner.png"></img></f7-login-screen-title>
            <f7-list form>
              <f7-list-item>
                <f7-label>Name</f7-label>
                <f7-input v-model="name" type="text" placeholder="Name"></f7-input>
              </f7-list-item>
              <f7-list-item>
                <f7-label>Game ID</f7-label>
                <f7-input v-model="game_id" type="text" placeholder="ABCD"></f7-input>
              </f7-list-item>
            </f7-list>
            <f7-list>
              <f7-list-button title="Sign In" @click="SignIn"></f7-list-button>
              <f7-list-label>
                <p>Leave game id blank to start a new game.</p>
              </f7-list-label>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </div>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
          <f7-nav-left>
            <f7-link icon-f7="more" open-panel="left"></f7-link>
            <f7-link icon-f7="share" @click="PlayWhiteCard"></f7-link>
          </f7-nav-left>
          <f7-nav-center sliding>{{ game_id }}</f7-link></f7-nav-center>
          <f7-nav-right>
            <f7-link @click="PlayRando">RANDO</f7-link>
            <f7-link icon-f7="trash" @click="ClearPlayed"></f7-link>
          </f7-nav-right>
        </f7-navbar>

        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <f7-page-content style="overflow: visible;">
              <black-card @click.native="DrawBlackCard" :game="game_id" :text="black_card.text" :pick="black_card.pick"/>
              <white-card style="z-index: 500;" class="draggable" v-bind:class="{'revealed-card': IsSelected(), hidden: !IsSelected()}" :text="SelectedWhiteCard()"/>
              <played-cards :game="game_id" ref="whiteCardsPlayed"/>
              <player-hand ref="playerHand" :game="game_id" :name="name" />
            </f7-page-content>
          </f7-page>

        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
import BlackCard from "./components/BlackCard.vue";
import WhiteCard from "./components/WhiteCard.vue";
import PlayerHand from "./components/PlayerHand.vue";
import PlayedCards from "./components/PlayedCards.vue";
import Scoreboard from "./components/Scoreboard.vue";
import Deck from "./Deck.js";
import { DB } from "./Firebase.js";
import firebase from "firebase";

var Draggabilly = require("draggabilly");

let deck = new Deck();
export default {
    components: {
        BlackCard,
        WhiteCard,
        PlayerHand,
        PlayedCards,
        Scoreboard
    },

    data: function() {
        return {
            black_card: { text: "", pick: 0 },
            game_id: "",
            name: ""
        };
    },

    methods: {
        DrawBlackCard() {
            let potential_black_card = deck.DrawBlackCard();
            let drawn_cards = DB.ref(this.game_id).child("drawn_cards").orderByKey();
            drawn_cards.once("value", snapshot => {
              let deck_check = [];
              snapshot.forEach(function(childSnapshot) {
                var child_data = childSnapshot.val();
                deck_check.push(child_data);
              });

              while (deck_check.includes(potential_black_card.text))
              {
                console.log(potential_black_card.text + " -- Has already been draw retry");
                potential_black_card = deck.DrawBlackCard();
              }
              DB.ref(this.game_id).child("drawn_cards").push(potential_black_card.text);
              this.black_card = potential_black_card;
            });
        },
        DrawWhiteCard() {
            if (this.$refs.playerHand.FullHand()) {
              return;
            }

            let potential_white_card = deck.DrawWhiteCard();

            let drawn_cards = DB.ref(this.game_id).child("drawn_cards").orderByKey();
            drawn_cards.once("value", snapshot => {
              let deck_check = [];
              snapshot.forEach(function(childSnapshot) {
                var child_data = childSnapshot.val();
                deck_check.push(child_data);
              });

              while (deck_check.includes(potential_white_card))
              {
                console.log(potential_white_card + " -- Has already been drawn. Retry");
                potential_white_card = deck.DrawWhiteCard();
              }
              DB.ref(this.game_id).child("drawn_cards").push(potential_white_card);
              this.$refs.playerHand.UpdateHand(potential_white_card);
            });
        },
        PlayRando() {
            let potential_white_card = deck.DrawWhiteCard();

            let drawn_cards = DB.ref(this.game_id).child("drawn_cards").orderByKey();
            drawn_cards.once("value", snapshot => {
              let deck_check = [];
              snapshot.forEach(function(childSnapshot) {
                var child_data = childSnapshot.val();
                deck_check.push(child_data);
              });

              while (deck_check.includes(potential_white_card))
              {
                console.log(potential_white_card + " -- Has already been drawn. Retry");
                potential_white_card = deck.DrawWhiteCard();
              }
              DB.ref(this.game_id).child("drawn_cards").push(potential_white_card);
              this.$refs.whiteCardsPlayed.UpdatePlayed("Rando Cardissian", potential_white_card);
            });

        },
        PlayWhiteCard() {
            let card = this.$refs.playerHand.GetSelected();
            if (card == "") {
                return;
            }
            this.$refs.whiteCardsPlayed.UpdatePlayed(this.name, card);
            this.$refs.playerHand.RemoveCard(card);
            this.DrawWhiteCard();
        },
        ClearPlayed() {
            this.$refs.whiteCardsPlayed.Clear();
        },
        SelectedWhiteCard() {
          if (this.game_id === "")
          {
            return "";
          }
          return this.$refs.whiteCardsPlayed.GetSelected();
        },
        IsSelected() {
          if (this.game_id === "")
          {
            return false
          }
          return this.$refs.whiteCardsPlayed.GetSelected().length > 0;
        },
        SignIn() {
          let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          let new_game_id = '';
          for (var i = 5; i > 0; --i)
          {
              new_game_id += chars[Math.round(Math.random() * (chars.length - 1))];
          }
                        
          if (this.name != "") {
            this.game_id = this.game_id == "" ? new_game_id : this.game_id;
            DB.ref(this.game_id).child("timestamp").set(firebase.database.ServerValue.TIMESTAMP);
            this.$f7.closeModal(".login-screen", true);

            for ( var i = 0; i < 10; i++ ) {
              this.DrawWhiteCard();
            }
          }

          var elem = document.querySelector('.draggable');
          var draggie = new Draggabilly( elem, {
            // options...
          });
        }
    }
};
</script>