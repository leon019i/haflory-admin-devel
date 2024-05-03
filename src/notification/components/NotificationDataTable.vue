<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold heading-font">
          {{ $t("notification.history") }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            :label="$t('product.product.search')"
            single-line
            hide-details
            clearable
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="allNotification"
          :loading="loading"
          :search="search"
        >
          <template v-slot:item._id="{ item }">
            <p>
              {{
                allNotification
                  .map(function (x) {
                    return x._id;
                  })
                  .indexOf(item._id) + 1
              }}
            </p>
          </template>

          <template v-slot:item.message="{ item }">
            <h4 class="grey1--text font-weight-normal my-0 py-0">
              {{ !!item.message ? item.message : "-" }}
            </h4>
          </template>

          <template v-slot:item.createdAt="{ item }">
            <h4 class="grey1--text font-weight-normal my-0 py-0">
              {{
                !!item.createdAt
                  ? new Date(parseInt(item.createdAt)).toLocaleString()
                  : "-"
              }}
            </h4>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <SideDrawer>
      <ViewOrEditCategory
        v-if="is_drawer == 'ViewCategory' || is_drawer == 'EditCategory'"
        :isEditCategory="is_drawer == 'EditCategory'"
        :currentPromotion="currentPromotion"
      />
    </SideDrawer>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deletePromotion } from "@/settings/methods/delete_promotion.js";
import { updatePromotion } from "@/settings/methods/update_promotion.js";
import avatar from "vue-avatar";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    ViewOrEditCategory: () =>
      import("@/settings/components/RightSideDrawer/ViewOrEditPromotion.vue"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
    avatar,
  },
  data() {
    return {
      search: "",

      options: {},
      loading: true,
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        { text: this.$t("notification.message"), value: "message" },
        {
          text: this.$t("notification.dateAndTime"),
          value: "createdAt",
          width: 145,
        },
      ],
      variables: {
        limit: 0,
        skip: 0,
      },
      currentPromotion: {},
      allNotification: [],
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },

  apollo: {
    notifications() {
      return {
        query: require("@/notification/api/queries/notifcations_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          // console.log(data);
          this.loading = false;
          this.allNotification = data.notifications.reverse();
        },
      };
    },
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, promotion) {
      this.currentPromotion = promotion;
      if (action == "view") {
        this.showSideDrawer("ViewCategory");
      } else if (action == "edit") {
        this.showSideDrawer("EditCategory");
      } else {
        this.$refs.form.show();
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        deletePromotion(this.currentPromotion);
      }
    },
    updatePromotionStatus(item) {
      let promotionInput = {
        id: item._id,
        avatar: item.avatar,
        order: parseInt(item.order),
      };
      // console.log(promotionInput);
      updatePromotion(promotionInput);
    },
  },
};
</script>
<style scoped>
>>> tbody tr:nth-of-type(odd) {
  background: #f2f2f2;
}
>>> .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: transparent;
}
</style>