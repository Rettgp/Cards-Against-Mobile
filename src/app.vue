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

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- iOS Theme Navbar -->
        <f7-navbar v-if="$theme.ios">
          <f7-nav-left>
            <f7-link icon-f7="card" @click="DrawBlackCard"></f7-link>
          </f7-nav-left>
          <f7-nav-center sliding>Cards Against Mobile</f7-nav-center>
          <f7-nav-right>
            <f7-link icon-f7="card_fill" @click="DrawWhiteCard"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <!-- Page Content -->
            <f7-page-content>
              <black-card v-if="black_card_drawn" :text="black_card.text" :pick="black_card.pick"/>
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
import draggable from 'vuedraggable'
import Deck from "./Deck.js";
let deck = new Deck();
export default {
    components: {
        BlackCard,
        PlayerHand,
        draggable
    },

    data: function() {
        return {
            black_card_drawn: false,
            black_card: { text: "", pick: 0 }
        };
    },

    methods: {
        DrawBlackCard() {
            this.black_card = deck.DrawBlackCard();
            this.black_card_drawn = true;
        },
        DrawWhiteCard() {
            let white_card = deck.DrawWhiteCard();
            this.$refs.playerHand.UpdateHand(white_card);
        }
    }
};

</script>