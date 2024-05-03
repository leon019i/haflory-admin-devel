<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">{{ $t('places.allGovernorates')}}</v-card-title>

        <v-data-table :headers="headers" :items="allPlaces" :loading="loading" disable-sort>
          <template v-slot:item._id="{ item }">
            <p>{{allPlaces.map(function(x) {return x._id; }).indexOf(item._id) + 1}}</p>
          </template>
          <template v-slot:item.nameEn="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{ item.nameEn}}</h4>
          </template>

          <template v-slot:item.nameAr="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{item.nameAr }}</h4>
          </template>
          <template v-slot:item.areas="{ item }">
            <v-row v-for="area in  item.areas" :key="area._id">
              <h4
                class="grey3--text font-weight-normal my-1 py-0"
              >{{ $store.getters.rtl ? area.nameAr : area.nameEn}}</h4>
            </v-row>
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
      <ViewOrEditPlace
        v-if="is_drawer == 'ViewPlace' || is_drawer == 'EditPlace'"
        :isEditPlace="is_drawer == 'EditPlace'"
        :currentPlace="currentPlace"
      />
    </SideDrawer>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteGovernorate } from "@/places/methods/delete_place.js";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    DeleteModal: () =>
      import("@/core/components/Modal/DeleteConfirmationModal.vue"),
    ViewOrEditPlace: () =>
      import("@/places/components/RightSideDrawer/ViewOrEditPlace.vue"),
  },
  data() {
    return {
      loading: true,
      search: "",
      filterByCategory: "",
      filterBySeller: "",
      headers: [
        {
          text: "#",
          align: "left",
          value: "_id",
        },
        { text: this.$t("places.nameEn"), value: "nameEn" },
        { text: this.$t("places.nameAr"), value: "nameAr" },
        { text: this.$t("places.subAreas"), value: "areas" },
        { text: "", value: "action" },
      ],
      currentPlace: {},
      allPlaces: [],
      allSellers: [],
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },
  apollo: {
    governorates() {
      return {
        query: require("@/places/api/queries/places_query.graphql"),
        variables: this.variables,
        result({ data, loading, networkStatus, refetch }) {
          // console.log("places", data.governorates);
          this.loading = false;
          this.allPlaces = data.governorates;
        },
      };
    },
  },

  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, place) {
      this.currentPlace = place;

      if (action == "view") {
        this.showSideDrawer("ViewPlace");
      } else if (action == "edit") {
        this.showSideDrawer("EditPlace");
      } else {
        this.$refs.form.show();
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        deleteGovernorate(this.currentPlace);
      }
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