<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left reveal layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar v-if="$theme.ios" title="Settings" sliding></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-navbar v-if="$theme.material" title="Left Panel" sliding></f7-navbar>
            <f7-block-title>Black Card Deck</f7-block-title>
            <f7-list>
              <f7-button @click="DrawBlackCard">Draw</f7-button>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>

    <div class="login-screen modal-in">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title>CAH Mobile</f7-login-screen-title>
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
            <f7-link icon-f7="card" @click="DrawWhiteCard"></f7-link>
            <f7-link icon-f7="share" @click="PlayWhiteCard"></f7-link>
          </f7-nav-left>
          <f7-nav-center sliding>{{ game_id }}</f7-nav-center>
          <f7-nav-right>
            <f7-link icon-f7="trash" @click="ClearPlayed"></f7-link>
            <f7-link icon-f7="card_fill" @click="DrawBlackCard"></f7-link>
          </f7-nav-right>
        </f7-navbar>

        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <f7-page-content>
              <black-card :game="game_id" :text="black_card.text" :pick="black_card.pick"/>
              <played-cards :game="game_id" ref="whiteCardsPlayed"/>
            </f7-page-content>
            <f7-toolbar style="height: 100px;" bottom>
              <player-hand ref="playerHand"/>
            </f7-toolbar>
          </f7-page>

        </f7-pages>
      </f7-view>
    </f7-views>
  </div>
</template>

<script>
import BlackCard from "./components/BlackCard.vue";
import PlayerHand from "./components/PlayerHand.vue";
import PlayedCards from "./components/PlayedCards.vue";
import draggable from "vuedraggable";
import Deck from "./Deck.js";
import { DB } from "./Firebase.js";

let deck = new Deck();
export default {
    components: {
        BlackCard,
        PlayerHand,
        PlayedCards,
        draggable
    },

    data: function() {
        return {
            black_card_drawn: false,
            black_card: { text: "", pick: 0 },
            game_id: "",
            name: ""
        };
    },

    firebase: {
        games: {
            source: DB.ref("/")
        }
    },

    methods: {
        DrawBlackCard() {
            this.black_card = deck.DrawBlackCard();
            this.black_card_drawn = true;
        },
        DrawWhiteCard() {
            let white_card = deck.DrawWhiteCard();
            this.$refs.playerHand.UpdateHand(white_card);
        },
        PlayWhiteCard() {
            let card = this.$refs.playerHand.GetSelected();
            if (card == "") {
                return;
            }
            this.$refs.whiteCardsPlayed.UpdatePlayed(this.name, card);
            this.$refs.playerHand.RemoveCard(card);
        },
        ClearPlayed() {
            this.$refs.whiteCardsPlayed.Clear();
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
            // if (this.game_id == "") {
              // DB.ref("/"+new_game_id).set({ black_card: "" });
            // }
            this.$f7.closeModal(".login-screen", true);
          }
        }
    }
};
</script>