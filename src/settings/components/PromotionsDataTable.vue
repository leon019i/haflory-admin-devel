<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">
          {{ $t('settings.promotions')}}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            :label=" $t('product.product.search')"
            single-line
            hide-details
            clearable
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="promotions" :loading="loading" :search="search">
          <template v-slot:item._id="{ item }">
            <p>{{promotions.map(function(x) {return x._id; }).indexOf(item._id) + 1}}</p>
          </template>

          <template v-slot:item.avatar="{ item }">
            <avatar
              :username="item.nameEn"
              :size="50"
              :src="'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +item.avatar"
            />
          </template>

          <template v-slot:item.order="{ item }">
            <v-text-field
              rounded
              @change="updatePromotionStatus(item)"
              color="primary"
              v-model="item.order"
              text
              flat
              type="number"
              :min="1"
              solo
            ></v-text-field>
          </template>

          <template v-slot:item.action="{ item }">
            <v-row class="mx-0">
              <v-icon color="secondary" @click="showDrawer('view',item)">mdi-eye</v-icon>
              <v-icon color="primary" @click="showDrawer('edit',item)">mdi-pencil</v-icon>
              <v-icon color="red" @click="showDrawer('delete',item)">mdi-delete</v-icon>
            </v-row>
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
        { text: this.$t("settings.image"), value: "avatar" },
        { text: this.$t("settings.order"), value: "order", width: 145 },
        { text: "", value: "action" },
      ],
      variables: {
        limit: 0,
        skip: 0,
      },
      currentPromotion: {},
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },

  apollo: {
    promotions() {
      return {
        query: require("@/settings/api/queries/promotions.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          // console.log(data);
          this.loading = false;
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