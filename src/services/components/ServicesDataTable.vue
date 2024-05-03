<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-6">
        <v-card-title class="primary--text font-weight-bold">
          {{ $t('services.allServices')}}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table :headers="headers" :items="services" :loading="loading" :search="search">
          <template v-slot:item._id="{ item }">
            <p>{{services.map(function(x) {return x._id; }).indexOf(item._id) + 1}}</p>
          </template>
          <template v-slot:item.nameEn="{ item }">
            <h4
              class="grey1--text font-weight-bold my-0 py-0"
            >{{ $store.getters.rtl ? item.nameAr : item.nameEn}}</h4>
          </template>

          <template v-slot:item.subServices="{ item }">
            <div v-if="item.subServices != null">
              <v-row v-for="service in  item.subServices" :key="service._id">
                <h4
                  class="grey3--text font-weight-normal my-1 py-0"
                >{{ $store.getters.rtl ? service.nameAr : service.nameEn}}</h4>
              </v-row>
            </div>
          </template>

          <template v-slot:item.price="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{ item.price}}</h4>
          </template>
          <template v-slot:item.commission="{ item }">
            <h4 class="grey1--text font-weight-bold my-0 py-0">{{ item.commission}}</h4>
          </template>
          <template v-slot:item.active="{ item }">
            <v-switch
              class="pa-0"
              value
              v-model="item.active"
              @change="updateServiceStatus(item)"
              color="secondary"
            ></v-switch>
          </template>
          <template v-slot:item.order="{ item }">
            <v-text-field
              rounded
              @change="updateServiceStatus(item)"
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
      <ViewOrEditService
        v-if="is_drawer == 'ViewService' || is_drawer == 'EditService'"
        :isEditService="is_drawer == 'EditService'"
        :currentService="currentService"
      />
    </SideDrawer>
    <DeleteModal @deleteThisItem="deleteThisItem" ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteService } from "@/services/methods/delete_service.js";
import { updateService } from "@/services/methods/update_service.js";
import avatar from "vue-avatar";

export default {
  components: {
    SideDrawer: () => import("@/core/components/SideDrawer"),
    ViewOrEditService: () =>
      import("@/services/components/RightSideDrawer/ViewOrEditService.vue"),
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
        { text: this.$t("services.nameEnOrAr"), value: "nameEn" },
        { text: this.$t("services.Subservices"), value: "subServices" },
        { text: this.$t("services.price"), value: "price" },
        { text: this.$t("services.commision"), value: "commission" },
        { text: this.$t("services.isActive"), value: "active" },
        { text: this.$t("services.displayOrder"), value: "order" },
        { text: "", value: "action" },
      ],
      variables: {
        limit: 0,
        skip: 0,
      },
      currentService: {},
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },

  apollo: {
    services() {
      return {
        query: require("@/services/api/queries/services_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          // console.log(data);
          this.loading = false;
        },
      };
    },
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function (action, service) {
      this.currentService = service;
      if (action == "view") {
        this.showSideDrawer("ViewService");
      } else if (action == "edit") {
        this.showSideDrawer("EditService");
      } else {
        this.$refs.form.show();
      }
    },
    deleteThisItem(val) {
      if (val == true) {
        deleteService(this.currentService._id);
      }
    },
    updateServiceStatus(item) {
      let categoryInput = {
        id: item._id,
        nameEn: item.nameEn,
        nameAr: item.nameAr,
        order: item.order,
        active: item.active,
        avatar: item.avatar,
        price: item.price,
        commission: item.commission,
        subServices: item.subServices,
      };
      updateService(categoryInput);
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