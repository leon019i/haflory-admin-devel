<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-card
            v-for="card in cards"
            :key="card.name"
            elevation="0"
            flat
            class="card-border ma-5"
            width="220"
          >
            <v-row v-if="isValid(card.nameEn)">
              <v-col class="primary left-side-height">
                <v-icon color="white" class="ma-4" x-large>{{
                  card.iconName
                }}</v-icon>
              </v-col>
              <v-col>
                <h2 class="secondary--text">{{ card.count }}</h2>
                <p class="grey3--text">
                  {{ $store.getters.rtl ? card.nameAr : card.nameEn }}
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { isAdmin, isSeller, getCurrentUser } from "@/user/utlis/helper.js";

export default {
  data() {
    return {
      cards: [
        {
          iconName: "mdi-clipboard-check",
          nameEn: "Orders",
          nameAr: "طلب",
          count: 0,
        },
        // {
        //   iconName: "mdi-account-supervisor-circle",
        //   nameEn: "Users",
        //   nameAr: "المستخدمون",
        //   count: 0,
        // },
        {
          iconName: "mdi-account",
          nameEn: "Drivers",
          nameAr: "السائقين",
          count: 0,
        },
      ],
    };
  },
  apollo: {
    dashboardCount() {
      return {
        query: require("@/user/api/queries/dashboard_counts_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          (this.cards[0].count = data.dashboardCount.totalOrder),
            (this.cards[1].count = data.dashboardCount.driversCount);
        },
      };
    },
  },
  methods: {
    isAdmin,
    isValid(val) {
      // console.log(this.isAdmin());
      if (this.isAdmin() == true) {
        return true;
      } else {
        if (val === "Products" || val === "Orders") {
          return true;
        } else {
          return false;
        }
      }
    },
  },
};
</script>
<style  scoped>
.card-border {
  box-shadow: 2px 2px 4px rgba(51, 120, 161, 0.2);
}
.left-side-height {
  height: 100px;
}
</style>